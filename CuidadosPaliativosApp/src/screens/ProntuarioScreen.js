
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Tela: Meu Prontuário
export default function ProntuarioScreen() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Meu Prontuário</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView style={styles.content}>
        <Text style={styles.sectionTitle}>📋 Informações do Paciente</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.value}>Maria das Dores</Text>

          <Text style={styles.label}>Idade:</Text>
          <Text style={styles.value}>67 anos</Text>

          <Text style={styles.label}>Diagnóstico:</Text>
          <Text style={styles.value}>Câncer de pulmão em tratamento paliativo</Text>

          <Text style={styles.label}>Responsável Médico:</Text>
          <Text style={styles.value}>Dr. João Pereira</Text>
        </View>

        <Text style={styles.sectionTitle}>🩺 Histórico de Atendimentos</Text>

        <View style={styles.card}>
          <Text style={styles.item}>• 10/10/2024 - Consulta de acompanhamento</Text>
          <Text style={styles.item}>• 25/09/2024 - Avaliação de dor e medicação</Text>
          <Text style={styles.item}>• 12/09/2024 - Atendimento domiciliar</Text>
          <Text style={styles.item}>• 30/08/2024 - Atualização de prontuário</Text>
        </View>

        <Text style={styles.sectionTitle}>💊 Medicações em uso</Text>
        <View style={styles.card}>
          <Text style={styles.item}>• Morfina - 10mg a cada 8h</Text>
          <Text style={styles.item}>• Paracetamol - 500mg se dor leve</Text>
          <Text style={styles.item}>• Omeprazol - 20mg ao acordar</Text>
        </View>

        <Text style={styles.footer}>
          Essas informações são apenas um exemplo. Consulte sempre o profissional de saúde responsável.
        </Text>
      </ScrollView>
    </View>
  );
}

// Estilos da tela
const styles = StyleSheet.create({
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
    color: '#2b6b87',
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
    color: '#2b6b87',
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
    color: '#2b6b87',
    fontStyle: 'italic',
    marginTop: 15,
    fontSize: 15,
  },
});
