import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://192.168.0.118:3000/";

export default function ProntuarioScreen({ navigation }) {
  const [paciente, setPaciente] = useState(null);
  const [atendimentos, setAtendimentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para decodificar JWT
  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Erro ao decodificar token', e);
      return null;
    }
  };

  useEffect(() => {
    const fetchDados = async () => {
      try {
        const token = await AsyncStorage.getItem('TOKEN');
        if (!token) {
          console.error("Token não encontrado!");
          setLoading(false);
          return;
        }

        const decoded = parseJwt(token);
        if (!decoded || !decoded.id) {
          console.error("Token inválido!");
          setLoading(false);
          return;
        }

        const pacienteId = decoded.id;

        // Buscar paciente
        const respPaciente = await fetch(`${BASE_URL}pacientes/${pacienteId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataPaciente = await respPaciente.json();

        if (dataPaciente.error) {
          console.error(dataPaciente.message);
          setLoading(false);
          return;
        }
        setPaciente(dataPaciente.usuario);

        // Buscar atendimentos
        const respAtend = await fetch(`${BASE_URL}atendimento`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataAtend = await respAtend.json();

        if (!dataAtend.error) {
          const meusAtendimentos = dataAtend.filter(a => a.pacienteId === pacienteId);
          setAtendimentos(meusAtendimentos);
        }

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, []);

  if (loading) {
    return (
      <View style={Estilo.container}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Carregando...</Text>
      </View>
    );
  }

  if (!paciente) {
    return (
      <View style={Estilo.container}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>Paciente não encontrado!</Text>
      </View>
    );
  }

  // Agora temos apenas 2 blocos: paciente + todos atendimentos
  const listaFlat = [
    { tipo: 'paciente', dados: paciente },
    { tipo: 'atendimentos', dados: atendimentos }
  ];

  const renderItem = ({ item }) => {
    if (item.tipo === 'paciente') {
      return (
        <View style={Estilo.card}>
          <Text style={Estilo.sectionTitle}>📋 Informações do Paciente</Text>

          <Text style={Estilo.label}>Nome:</Text>
          <Text style={Estilo.value}>{item.dados.nome}</Text>

          <Text style={Estilo.label}>Idade:</Text>
          <Text style={Estilo.value}>
            {new Date().getFullYear() - new Date(item.dados.dataNascimento).getFullYear()} anos
          </Text>

          <Text style={Estilo.label}>Diagnóstico:</Text>
          <Text style={Estilo.value}>{item.dados.diagnostico}</Text>

          <Text style={Estilo.label}>Responsável Médico:</Text>
          <Text style={Estilo.value}>{item.dados.medico_responsavel}</Text>
        </View>
      );
    }

    if (item.tipo === 'atendimentos') {
      return (
        <View style={Estilo.card}>
          <Text style={Estilo.sectionTitle}>🩺 Histórico de Atendimentos</Text>

          {item.dados.length === 0 && (
            <Text style={Estilo.value}>Nenhum atendimento encontrado.</Text>
          )}

          {item.dados.map((a, index) => (
            <Text key={index} style={Estilo.item}>
              • {a.data} - {a.descricao}
            </Text>
          ))}
        </View>
      );
    }

    return null;
  };

  return (
    <View style={Estilo.container}>
      <FlatList
        data={listaFlat}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={{ padding: 20 }}
      />
    </View>
  );
}

const Estilo = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  card: { backgroundColor: '#d9e3e8', borderRadius: 15, padding: 15, marginBottom: 15 },
  sectionTitle: { color: '#37758a', fontSize: 18, fontWeight: '700', marginBottom: 8, marginTop: 10 },
  label: { color: '#37758a', fontWeight: '600', fontSize: 16, marginTop: 5 },
  value: { color: '#333333', fontSize: 16, marginBottom: 5 },
  item: { color: '#333333', fontSize: 16, marginBottom: 4 },
});
