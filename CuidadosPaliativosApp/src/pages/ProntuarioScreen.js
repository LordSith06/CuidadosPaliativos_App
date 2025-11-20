
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';


export default function ProntuarioScreen() {
  return (
    <View style={Estilo.container}>
      {/* Cabeçalho */}
      <View style={Estilo.header}>
        <Text style={Estilo.headerText}>Meu Prontuário</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView style={Estilo.content}>
        <Text style={Estilo.sectionTitle}>📋 Informações do Paciente</Text>

        <View style={Estilo.card}>
          <Text style={Estilo.label}>Nome:</Text>
          <Text style={Estilo.value}>Maria das Dores</Text>

          <Text style={Estilo.label}>Idade:</Text>
          <Text style={Estilo.value}>67 anos</Text>

          <Text style={Estilo.label}>Diagnóstico:</Text>
          <Text style={Estilo.value}>Câncer de pulmão em tratamento paliativo</Text>

          <Text style={Estilo.label}>Responsável Médico:</Text>
          <Text style={Estilo.value}>Dr. João Pereira</Text>
        </View>

        <Text style={Estilo.sectionTitle}>🩺 Histórico de Atendimentos</Text>

        <View style={Estilo.card}>
          <Text style={Estilo.item}>• 10/10/2024 - Consulta de acompanhamento</Text>
          <Text style={Estilo.item}>• 25/09/2024 - Avaliação de dor e medicação</Text>
          <Text style={Estilo.item}>• 12/09/2024 - Atendimento domiciliar</Text>
          <Text style={Estilo.item}>• 30/08/2024 - Atualização de prontuário</Text>
        </View>

        <Text style={Estilo.sectionTitle}>💊 Medicações em uso</Text>
        <View style={Estilo.card}>
          <Text style={Estilo.item}>• Morfina - 10mg a cada 8h</Text>
          <Text style={Estilo.item}>• Paracetamol - 500mg se dor leve</Text>
          <Text style={Estilo.item}>• Omeprazol - 20mg ao acordar</Text>
        </View>

        <Text style={Estilo.footer}>
          Essas informações são apenas um exemplo. Consulte sempre o profissional de saúde responsável.
        </Text>
      </ScrollView>
    </View>
  );
}

const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#37758a',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  sectionTitle: {
    color: '#37758a',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
    marginTop: 10,
  },
  card: {
    backgroundColor: '#d9e3e8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
  },
  label: {
    color: '#37758a',
    fontWeight: '600',
    fontSize: 16,
    marginTop: 5,
  },
  value: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 5,
  },
  item: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 4,
  },
  footer: {
    textAlign: 'center',
    color: '#37758a',
    fontStyle: 'italic',
    marginTop: 15,
    fontSize: 15,
  },
});
