
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

// Tela FAQ - Perguntas Frequentes
export default function FaqScreen() {
  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerText}>FAQ</Text>
      </View>

      {/* Conteúdo rolável */}
      <ScrollView style={styles.content}>
        <Text style={styles.question}>
          1. O que são cuidados paliativos?
        </Text>
        <Text style={styles.answer}>
          São cuidados voltados para melhorar a qualidade de vida de pessoas com doenças graves, aliviando o sofrimento físico, emocional e espiritual.
        </Text>

        <Text style={styles.question}>
          2. Quem pode receber cuidados paliativos?
        </Text>
        <Text style={styles.answer}>
          Qualquer pessoa com doença que ameace a vida e cause sofrimento, independentemente da idade ou do estágio da doença.
        </Text>

        <Text style={styles.question}>
          3. Os cuidados paliativos substituem outros tratamentos?
        </Text>
        <Text style={styles.answer}>
          Não. Eles podem ser aplicados junto com o tratamento curativo, buscando sempre o bem-estar do paciente.
        </Text>

        <Text style={styles.question}>
          4. Onde posso receber cuidados paliativos?
        </Text>
        <Text style={styles.answer}>
          Em hospitais, clínicas, unidades de saúde ou até mesmo em casa, conforme a disponibilidade do serviço.
        </Text>

        <Text style={styles.question}>
          5. Há tratamento paliativo no SUS?
        </Text>
        <Text style={styles.answer}>
          Sim. Muitos hospitais e unidades de saúde do SUS oferecem equipes de cuidados paliativos para pacientes e familiares.
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
