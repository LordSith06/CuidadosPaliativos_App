
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';


export default function FaqScreen() {
  return (
    <View style={Estilo.container}>
      {/* Cabeçalho */}
      <View style={Estilo.header}>
        <Text style={Estilo.headerText}>FAQ</Text>
      </View>

      {/* Conteúdo rolável */}
<ScrollView style={Estilo.content}>
  <Text style={Estilo.question}>
    1. O que são cuidados paliativos?
  </Text>
  <Text style={Estilo.answer}>
    São práticas de cuidado que têm como objetivo promover qualidade de vida para pessoas com doenças graves, reduzindo sintomas e oferecendo suporte físico, emocional e espiritual.
  </Text>

  <Text style={Estilo.question}>
    2. Quem pode receber cuidados paliativos?
  </Text>
  <Text style={Estilo.answer}>
    Qualquer pessoa que conviva com uma doença séria e apresente sofrimento pode receber cuidados paliativos, independentemente da idade ou fase da doença.
  </Text>

  <Text style={Estilo.question}>
    3. Os cuidados paliativos substituem outros tratamentos?
  </Text>
  <Text style={Estilo.answer}>
    Não. Eles podem ser integrados ao tratamento curativo, ajudando a melhorar o bem-estar durante todo o processo terapêutico.
  </Text>

  <Text style={Estilo.question}>
    4. Onde posso receber cuidados paliativos?
  </Text>
  <Text style={Estilo.answer}>
    Podem ser oferecidos em hospitais, clínicas, unidades de saúde ou até no próprio lar, dependendo dos serviços disponíveis na região.
  </Text>

  <Text style={Estilo.question}>
    5. Há tratamento paliativo no SUS?
  </Text>
  <Text style={Estilo.answer}>
    Sim. Diversas unidades e hospitais do SUS contam com equipes especializadas em cuidados paliativos para atender pacientes e seus familiares.
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
    paddingVertical: 25,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 30,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  question: {
    color: '#2b6b87',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 15,
  },
  answer: {
    color: '#333333',
    fontSize: 16,
    marginTop: 5,
    lineHeight: 22,
  },
});
