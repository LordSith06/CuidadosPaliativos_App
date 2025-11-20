import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView
} from 'react-native';

export default function ProntuarioScreen() {
  const [selecionados, setSelecionados] = useState([]);

  const sintomas = [
    { nome: "Dor de cabeça", acao: "Tente descansar, beber água e, se necessário, use analgésico leve." },
    { nome: "Náuseas", acao: "Evite alimentos pesados e mantenha-se hidratado. Procure ajuda se persistir." },
    { nome: "Febre", acao: "Tome antitérmico e monitore. Se passar de 38.5°C, procure atendimento." },
    { nome: "Tontura", acao: "Sente-se, respire fundo e evite movimentos bruscos." },
    { nome: "Falta de ar", acao: "Procure atendimento médico imediatamente." },
    { nome: "Cansaço extremo", acao: "Descanse e hidrate-se. Se persistir, consulte um médico." },
    { nome: "Dor no peito", acao: "Procure um hospital imediatamente." },
  ];

  const alternarSelecao = (sintoma) => {
    if (selecionados.includes(sintoma)) {
      setSelecionados(selecionados.filter(item => item !== sintoma));
    } else {
      setSelecionados([...selecionados, sintoma]);
    }
  };

  return (
    <View style={Estilo.container}>

      {/* Cabeçalho */}
      <View style={Estilo.header}>
        <Text style={Estilo.headerText}>Prontuário Médico</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView style={Estilo.content}>
        <Text style={Estilo.labelLista}>Selecione seus sintomas:</Text>

        {sintomas.map((s, index) => (
          <View key={index} style={Estilo.item}>
            <TouchableOpacity 
              style={Estilo.checkboxArea} 
              onPress={() => alternarSelecao(s.nome)}
            >
              <View style={Estilo.checkbox}>
                {selecionados.includes(s.nome) && <View style={Estilo.checkboxMarcado} />}
              </View>
              <Text style={Estilo.itemText}>{s.nome}</Text>
            </TouchableOpacity>

            {/* Mensagem de orientação */}
            {selecionados.includes(s.nome) && (
              <Text style={Estilo.acaoText}>{s.acao}</Text>
            )}
          </View>
        ))}

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
    marginBottom: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  labelLista: {
    color: '#2b6b87',
    fontSize: 17,
    marginBottom: 10,
    fontWeight: '600',
  },
  item: {
    backgroundColor: '#d9e3e8',
    padding: 12,
    borderRadius: 10,
    marginBottom: 12,
  },
  itemText: {
    color: '#2b6b87',
    fontSize: 16,
    marginLeft: 10,
  },
  checkboxArea: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#2b6b87',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxMarcado: {
    width: 12,
    height: 12,
    backgroundColor: '#2b6b87',
    borderRadius: 3,
  },
  acaoText: {
    marginTop: 8,
    color: '#2b6b87',
    backgroundColor: '#ffffff',
    padding: 8,
    borderRadius: 8,
    fontSize: 14,
  },
});
