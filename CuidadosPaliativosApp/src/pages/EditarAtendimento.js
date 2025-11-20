import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditarAtendimento = ({ route, navigation }) => {
  const { atendimento } = route.params;

  const [data, setData] = useState(atendimento.data);
  const [medico, setMedico] = useState(atendimento.medico);
  const [descricao, setDescricao] = useState(atendimento.descricao);

  const salvar = async () => {
    if (!data || !medico || !descricao) {
      return Alert.alert("Atenção", "Preencha todos os campos!");
    }

    try {
      const token = await AsyncStorage.getItem("token");
      const pacienteId = await AsyncStorage.getItem("idUsuario");

      if (!pacienteId) {
        return Alert.alert("Erro", "Não foi possível identificar o paciente logado.");
      }

      const resp = await fetch(
        `http://10.0.1.20:3000/atualizaratendimento/${atendimento.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({ data, medico, descricao, pacienteId })
        }
      );

      const result = await resp.json();

      if (!result.error) {
        Alert.alert("Sucesso", "Atendimento atualizado!");
        navigation.goBack();
      } else {
        Alert.alert("Erro", result.message || "Falha ao atualizar.");
      }

    } catch (err) {
      console.log("Erro ao atualizar:", err);
      Alert.alert("Erro", "Algo deu errado ao atualizar o atendimento.");
    }
  };

  return (
    <View style={est.container}>
      <Text style={est.titulo}>Editar Atendimento</Text>

      <TextInput 
        style={est.input} 
        value={data} 
        onChangeText={setData} 
        placeholder="Data (Ex: 20/11/2025)"
      />

      <TextInput 
        style={est.input} 
        value={medico} 
        onChangeText={setMedico} 
        placeholder="Médico"
      />

      <TextInput 
        style={[est.input, { height: 120 }]}
        value={descricao} 
        multiline
        onChangeText={setDescricao} 
        placeholder="Descrição do atendimento"
      />

      <TouchableOpacity style={est.btnSalvar} onPress={salvar}>
        <Text style={est.btnSalvarTxt}>Salvar Alterações</Text>
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

export default EditarAtendimento;
