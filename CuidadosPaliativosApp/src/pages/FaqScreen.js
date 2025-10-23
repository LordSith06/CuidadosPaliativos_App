
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
          São cuidados voltados para melhorar a qualidade de vida de pessoas com doenças graves, aliviando o sofrimento físico, emocional e espiritual.
        </Text>

        <Text style={Estilo.question}>
          2. Quem pode receber cuidados paliativos?
        </Text>
        <Text style={Estilo.answer}>
          Qualquer pessoa com doença que ameace a vida e cause sofrimento, independentemente da idade ou do estágio da doença.
        </Text>

        <Text style={Estilo.question}>
          3. Os cuidados paliativos substituem outros tratamentos?
        </Text>
        <Text style={Estilo.answer}>
          Não. Eles podem ser aplicados junto com o tratamento curativo, buscando sempre o bem-estar do paciente.
        </Text>

        <Text style={Estilo.question}>
          4. Onde posso receber cuidados paliativos?
        </Text>
        <Text style={Estilo.answer}>
          Em hospitais, clínicas, unidades de saúde ou até mesmo em casa, conforme a disponibilidade do serviço.
        </Text>

        <Text style={Estilo.question}>
          5. Há tratamento paliativo no SUS?
        </Text>
        <Text style={Estilo.answer}>
          Sim. Muitos hospitais e unidades de saúde do SUS oferecem equipes de cuidados paliativos para pacientes e familiares.
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
