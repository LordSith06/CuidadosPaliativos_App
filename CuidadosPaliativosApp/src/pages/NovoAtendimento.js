import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NovoAtendimento = ({ navigation }) => {
  const [data, setData] = useState("");
  const [medico, setMedico] = useState("");
  const [descricao, setDescricao] = useState("");

  const salvar = async () => {
    if (!data || !medico || !descricao) {
      return Alert.alert("Atenção", "Preencha todos os campos!");
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const pacienteId = await AsyncStorage.getItem("idUsuario"); // <-- pegando automaticamente

      if (!pacienteId) {
        return Alert.alert("Erro", "Não foi possível identificar o paciente logado.");
      }

      const resposta = await fetch("http://10.0.1.20:3000/adicionaratendimento", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ data, medico, descricao, pacienteId })
      });

      const result = await resposta.json();

      if (resposta.ok) {
        Alert.alert("Sucesso", "Atendimento criado com sucesso!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", result.error || "Não foi possível criar o atendimento.");
      }

    } catch (err) {
      console.log("Erro ao criar atendimento:", err);
      Alert.alert("Erro", "Algo deu errado ao salvar.");
    }
  };

  return (
    <View style={est.container}>
      <Text style={est.titulo}>Novo Atendimento</Text>

      <TextInput 
        style={est.input} 
        placeholder="Data (Ex: 20/11/2025)" 
        value={data}
        onChangeText={setData}
      />

      <TextInput 
        style={est.input} 
        placeholder="Médico" 
        value={medico}
        onChangeText={setMedico}
      />

      <TextInput 
        style={[est.input, { height: 120 }]}
        placeholder="Descrição do atendimento"
        value={descricao}
        multiline
        onChangeText={setDescricao}
      />

      <TouchableOpacity style={est.btnSalvar} onPress={salvar}>
        <Text style={est.btnSalvarTxt}>Salvar Atendimento</Text>
      </TouchableOpacity>
    </View>
  );
};

const est = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: "#37758a", 
    padding: 25 
  },

  titulo: { 
    color: "white", 
    fontSize: 26, 
    fontWeight: "bold", 
    marginBottom: 20,
    textAlign: "center"
  },

  input: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    marginBottom: 15
  },

  btnSalvar: {
    backgroundColor: "#FFD700",
    padding: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10
  },

  btnSalvarTxt: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#37758a"
  }
});

export default NovoAtendimento;
