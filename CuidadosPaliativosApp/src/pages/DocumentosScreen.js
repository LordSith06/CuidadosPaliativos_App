import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';

export default function CadastroMedicamentoScreen() {
  const [nome, setNome] = useState('');
  const [mg, setMg] = useState('');
  const [descricao, setDescricao] = useState('');

  const handleSalvar = () => {
    if (!nome || !mg || !descricao) {
      alert("Preencha todos os campos!");
      return;
    }

    alert("Medicamento cadastrado com sucesso!");
  };

  return (
    <View style={Estilo.container}>
      {/* Cabeçalho */}
      <View style={Estilo.header}>
        <Text style={Estilo.headerText}>Cadastro de Medicamentos</Text>
      </View>

      <ScrollView style={Estilo.content}>
        <Text style={Estilo.sectionTitle}>💊 Informações do Medicamento</Text>

        <View style={Estilo.card}>
          <Text style={Estilo.label}>Nome do medicamento</Text>
          <TextInput
            style={Estilo.input}
            placeholder="Ex: Paracetamol"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={Estilo.label}>Miligramagem</Text>
          <TextInput
            style={Estilo.input}
            placeholder="Ex: 500mg"
            value={mg}
            onChangeText={setMg}
          />

          <Text style={Estilo.label}>Descrição / Observações</Text>
          <TextInput
            style={[Estilo.input, { height: 100 }]}
            placeholder="Ex: Tomar de 8 em 8 horas"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />
        </View>

        <TouchableOpacity style={Estilo.botao} onPress={handleSalvar}>
          <Text style={Estilo.botaoTexto}>Salvar Medicamento</Text>
        </TouchableOpacity>
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
    marginTop: 10,
  },
  input: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    marginTop: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#b6c4cc',
  },
  botao: {
    backgroundColor: '#37758a',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },
  botaoTexto: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
  },
});
