import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, Modal } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://192.168.0.226:3000/";

export default function ProntuarioScreen({ navigation }) {
  const [paciente, setPaciente] = useState(null);
  const [atendimentos, setAtendimentos] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);
  const [loading, setLoading] = useState(true);

  // --- Modal edição paciente ---
  const [modalEditarPacienteVisible, setModalEditarPacienteVisible] = useState(false);
  const [editNome, setEditNome] = useState('');
  const [editCpf, setEditCpf] = useState('');
  const [editMedicoResponsavel, setEditMedicoResponsavel] = useState('');
  const [editDiagnostico, setEditDiagnostico] = useState('');
  const [editDataNascimento, setEditDataNascimento] = useState('');
  const [loadingEditPaciente, setLoadingEditPaciente] = useState(false);

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
        if (!token) return setLoading(false);

        const decoded = parseJwt(token);
        if (!decoded || !decoded.id) return setLoading(false);

        const pacienteId = decoded.id;

        // Buscar paciente
        const respPaciente = await fetch(`${BASE_URL}pacientes/${pacienteId}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataPaciente = await respPaciente.json();
        if (!dataPaciente.error) setPaciente(dataPaciente.usuario);

        // Buscar atendimentos
        const respAtend = await fetch(`${BASE_URL}atendimento`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataAtend = await respAtend.json();
        if (!dataAtend.error) {
          const meusAtend = dataAtend.filter(a => a.pacienteId === pacienteId);
          setAtendimentos(meusAtend);
        }

        // Buscar medicamentos
        const respMed = await fetch(`${BASE_URL}medicamentos`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const dataMed = await respMed.json();
        if (!dataMed.error) {
          const meusMedicamentos = dataMed.medicamentos.filter(m => m.pacienteId === pacienteId);
          setMedicamentos(meusMedicamentos);
        }

      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDados();
  }, []);

  const abrirModalEdicaoPaciente = () => {
    if (!paciente) return;

    setEditNome(paciente.nome || '');
    setEditCpf(paciente.cpf || '');
    setEditMedicoResponsavel(paciente.medico_responsavel || '');
    setEditDiagnostico(paciente.diagnostico || '');
    setEditDataNascimento(paciente.dataNascimento ? paciente.dataNascimento.split('T')[0] : '');
    setModalEditarPacienteVisible(true);
  };

  const salvarEdicaoPaciente = async () => {
    if (!editNome || !editCpf || !editMedicoResponsavel || !editDiagnostico || !editDataNascimento) {
      alert("Preencha todos os campos!");
      return;
    }

    try {
      setLoadingEditPaciente(true);
      const token = await AsyncStorage.getItem('TOKEN');
      if (!token) throw new Error("Token não encontrado");

      const decoded = parseJwt(token);
      const pacienteId = decoded?.id;

      const res = await fetch(`${BASE_URL}atualizarpaciente/${pacienteId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nome: editNome,
          cpf: editCpf,
          medico_responsavel: editMedicoResponsavel,
          diagnostico: editDiagnostico,
          dataNascimento: editDataNascimento
        })
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erro ao atualizar paciente");

      setPaciente(data.usuario);
      setModalEditarPacienteVisible(false);
      alert("Paciente atualizado com sucesso!");
    } catch (error) {
      console.error(error);
      alert(error.message);
    } finally {
      setLoadingEditPaciente(false);
    }
  };

  if (loading) return <View style={Estilo.container}><Text style={{ textAlign: 'center', marginTop: 50 }}>Carregando...</Text></View>;
  if (!paciente) return <View style={Estilo.container}><Text style={{ textAlign: 'center', marginTop: 50 }}>Paciente não encontrado!</Text></View>;

  const listaFlat = [
    { tipo: 'paciente', dados: paciente },
    { tipo: 'atendimentos', dados: atendimentos },
    { tipo: 'medicamentos', dados: medicamentos }
  ];

  const renderItem = ({ item }) => {
    if (item.tipo === 'paciente') {
      return (
        <View style={Estilo.card}>
          <Text style={Estilo.sectionTitle}>📋 Informações do Paciente</Text>

          {/* Botão editar no canto superior direito */}
          <TouchableOpacity style={Estilo.botaoEditarCard} onPress={abrirModalEdicaoPaciente}>
            <Text style={{ color: '#fff', fontWeight: '700' }}>✏️</Text>
          </TouchableOpacity>

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
          {item.dados.length === 0 && <Text style={Estilo.value}>Nenhum atendimento encontrado.</Text>}
          {item.dados.map((a, index) => (
            <Text key={index} style={Estilo.item}>
              • {a.data} - {a.descricao}
            </Text>
          ))}
        </View>
      );
    }

    if (item.tipo === 'medicamentos') {
      return (
        <View style={Estilo.card}>
          <Text style={Estilo.sectionTitle}>💊 Medicamentos</Text>
          {item.dados.length === 0 && <Text style={Estilo.value}>Nenhum medicamento cadastrado.</Text>}
          {item.dados.map((m, index) => (
            <View key={index} style={{ marginBottom: 10 }}>
              <Text style={Estilo.label}>Nome: <Text style={Estilo.value}>{m.nome}</Text></Text>
              <Text style={Estilo.label}>Miligramagem: <Text style={Estilo.value}>{m.miligramagem}</Text></Text>
              <Text style={Estilo.label}>Descrição: <Text style={Estilo.value}>{m.descricao}</Text></Text>
            </View>
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

      {/* Modal Edição Paciente */}
      <Modal animationType="slide" transparent visible={modalEditarPacienteVisible}>
        <View style={Estilo.modalOverlay}>
          <View style={[Estilo.modalContent, { width: '90%' }]}>
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 15, color: '#000' }}>
              Editar Paciente
            </Text>

            <Text style={Estilo.label}>Nome</Text>
            <TextInput style={Estilo.input} value={editNome} onChangeText={setEditNome} />

            <Text style={Estilo.label}>CPF</Text>
            <TextInput style={Estilo.input} value={editCpf} onChangeText={setEditCpf} />

            <Text style={Estilo.label}>Médico Responsável</Text>
            <TextInput style={Estilo.input} value={editMedicoResponsavel} onChangeText={setEditMedicoResponsavel} />

            <Text style={Estilo.label}>Diagnóstico</Text>
            <TextInput style={Estilo.input} value={editDiagnostico} onChangeText={setEditDiagnostico} />

            <Text style={Estilo.label}>Data de Nascimento</Text>
            <TextInput style={Estilo.input} value={editDataNascimento} onChangeText={setEditDataNascimento} placeholder="YYYY-MM-DD" />

            <TouchableOpacity
              style={[Estilo.botao, { marginTop: 20 }]}
              onPress={salvarEdicaoPaciente}
              disabled={loadingEditPaciente}
            >
              <Text style={Estilo.botaoTexto}>{loadingEditPaciente ? "Salvando..." : "Salvar Alterações"}</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[Estilo.modalButton, { marginTop: 10 }]}
              onPress={() => setModalEditarPacienteVisible(false)}
            >
              <Text style={Estilo.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const Estilo = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  card: { backgroundColor: '#d9e3e8', borderRadius: 15, padding: 15, marginBottom: 15 },
  sectionTitle: { color: '#37758a', fontSize: 18, fontWeight: '700', marginBottom: 8, marginTop: 10 },
  label: { color: '#37758a', fontWeight: '600', fontSize: 16 },
  value: { color: '#333333', fontSize: 16 },
  item: { color: '#333333', fontSize: 16, marginBottom: 4 },

  input: { backgroundColor: '#ffffff', borderRadius: 10, padding: 10, marginTop: 5, fontSize: 16, borderWidth: 1, borderColor: '#b6c4cc' },
  botao: { backgroundColor: '#37758a', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  botaoTexto: { color: '#ffffff', fontSize: 18, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', borderRadius: 20, padding: 25, alignItems: 'center', backgroundColor: '#fff' },
  modalButton: { backgroundColor: '#37758a', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 30, marginTop: 10 },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },

  // botão de editar no card
  botaoEditarCard: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#37758a',
    padding: 8,
    borderRadius: 20,
    zIndex: 10
  }
});
