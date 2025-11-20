
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

export default function DocumentosScreen() {
  // Função simulada para "baixar" documento
  const abrirDocumento = (nome) => {
    Alert.alert('Ação', `Abrindo documento: ${nome}`);
  };

  return (
    <View style={Estilo.container}>
      {/* Cabeçalho */}
      <View style={Estilo.header}>
        <Text style={Estilo.headerText}>Medicamentos</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView style={Estilo.content}>
        <Text style={Estilo.info}>
          Aqui você pode visualizar e baixar documentos clínicos importantes, como exames e laudos médicos.
        </Text>

        {/* Lista de documentos */}
        <TouchableOpacity 
          style={Estilo.card}
          onPress={() => abrirDocumento('Laudo Médico - 10/10/2024.pdf')}
        >
          <Icon name="file-text" size={24} color="#2b6b87" />
          <Text style={Estilo.cardText}>Laudo Médico - 10/10/2024.pdf</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={Estilo.card}
          onPress={() => abrirDocumento('Exame de Sangue - 25/09/2024.pdf')}
        >
          <Icon name="file-text" size={24} color="#2b6b87" />
          <Text style={Estilo.cardText}>Exame de Sangue - 25/09/2024.pdf</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={Estilo.card}
          onPress={() => abrirDocumento('Receita Médica - 20/09/2024.pdf')}
        >
          <Icon name="file-text" size={24} color="#2b6b87" />
          <Text style={Estilo.cardText}>Receita Médica - 20/09/2024.pdf</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={Estilo.card}
          onPress={() => abrirDocumento('Relatório de Enfermagem - 05/09/2024.pdf')}
        >
          <Icon name="file-text" size={24} color="#2b6b87" />
          <Text style={Estilo.cardText}>Relatório de Enfermagem - 05/09/2024.pdf</Text>
        </TouchableOpacity>

        <Text style={Estilo.footer}>
          Para acessar os arquivos reais, entre em contato com a equipe responsável.
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
  info: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'justify',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#d9e3e8',
    borderRadius: 15,
    padding: 12,
    marginBottom: 10,
  },
  cardText: {
    color: '#2b6b87',
    fontSize: 16,
    marginLeft: 10,
  },
  footer: {
    textAlign: 'center',
    color: '#2b6b87',
    fontStyle: 'italic',
    marginTop: 25,
    fontSize: 15,
  },
});
