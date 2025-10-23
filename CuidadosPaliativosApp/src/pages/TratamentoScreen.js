
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';


export default function TratamentoScreen() {
  return (
    <View style={Estilo.container}>
      {/* Cabeçalho */}
      <View style={Estilo.header}>
        <Text style={Estilo.headerText}>Informações sobre o Tratamento</Text>
      </View>

      {/* Conteúdo com rolagem */}
      <ScrollView style={Estilo.content}>
        <Text style={Estilo.text}>
          Os cuidados paliativos têm como objetivo oferecer qualidade de vida 
          e conforto a pessoas que enfrentam doenças graves ou incuráveis.
        </Text>

        <Text style={Estilo.text}>
          Eles não significam o fim do tratamento, mas sim um cuidado 
          complementar que busca aliviar a dor e o sofrimento físico, emocional 
          e espiritual, tanto do paciente quanto de sua família.
        </Text>

        <Text style={Estilo.subTitle}>📋 Principais Objetivos:</Text>
        <Text style={Estilo.listItem}>• Controlar sintomas como dor, enjoo e ansiedade.</Text>
        <Text style={Estilo.listItem}>• Oferecer suporte emocional e psicológico.</Text>
        <Text style={Estilo.listItem}>• Melhorar o conforto e a dignidade do paciente.</Text>
        <Text style={Estilo.listItem}>• Apoiar familiares e cuidadores durante o processo.</Text>

        <Text style={Estilo.subTitle}>💊 Tipos de Tratamento:</Text>
        <Text style={Estilo.text}>
          O tratamento paliativo pode envolver o uso de medicamentos para 
          aliviar sintomas, acompanhamento psicológico, fisioterapia, 
          nutrição adequada e cuidados espirituais, conforme as necessidades 
          de cada paciente.
        </Text>

        <Text style={Estilo.subTitle}>🩺 Equipe Multidisciplinar:</Text>
        <Text style={Estilo.text}>
          A equipe de cuidados paliativos pode incluir médicos, enfermeiros, 
          psicólogos, fisioterapeutas, nutricionistas e assistentes sociais, 
          todos trabalhando juntos para oferecer o melhor cuidado possível.
        </Text>

        <Text style={Estilo.footer}>
          “Cuidar quando não é mais possível curar também é um ato de amor.”
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
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
  content: {
    padding: 20,
  },
  text: {
    color: '#333333',
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 10,
    textAlign: 'justify',
  },
  subTitle: {
    color: '#2b6b87',
    fontSize: 18,
    fontWeight: '700',
    marginTop: 15,
    marginBottom: 5,
  },
  listItem: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 5,
    lineHeight: 22,
  },
  footer: {
    textAlign: 'center',
    color: '#2b6b87',
    fontStyle: 'italic',
    marginTop: 20,
    fontSize: 16,
  },
});
