import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function CriarContaScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');

  const handleCriarConta = () => {
    // Aqui você pode adicionar a lógica de criar conta
    console.log('Conta criada:', { nome, cpf, senha, confirmarSenha });
  };

  return (
    <View style={Estilo.container}>
      {/* Botão Voltar */}
      <TouchableOpacity 
        style={Estilo.btnVoltar} 
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-back" size={24} color="#fff" />
        <Text style={Estilo.txtVoltar}>Voltar</Text>
      </TouchableOpacity>

      {/* Título */}
      <Text style={Estilo.title}>Criar Conta</Text>

      {/* Campos */}
      <TextInput
        style={Estilo.input}
        placeholder="Nome"
        placeholderTextColor="#d9e3e8"
        value={nome}
        onChangeText={setNome}
      />
      <TextInput
        style={Estilo.input}
        placeholder="CPF"
        placeholderTextColor="#d9e3e8"
        value={cpf}
        onChangeText={setCpf}
      />
      <TextInput
        style={Estilo.input}
        placeholder="Senha"
        placeholderTextColor="#d9e3e8"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />
      <TextInput
        style={Estilo.input}
        placeholder="Confirmar Senha"
        placeholderTextColor="#d9e3e8"
        secureTextEntry
        value={confirmarSenha}
        onChangeText={setConfirmarSenha}
      />

      {/* Botão Criar Conta */}
      <TouchableOpacity style={Estilo.btnCriar} onPress={handleCriarConta}>
        <Text style={Estilo.txtCriar}>Criar Conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37758a',
    padding: 20,
  },
  btnVoltar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
  },
  txtVoltar: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 5,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#FFD43B',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#2b6b87',
    width: '100%',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 20,
    color: '#fff',
    fontSize: 16,
    marginVertical: 8,
  },
  btnCriar: {
    backgroundColor: '#d9e3e8',
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  txtCriar: {
    color: '#2b6b87',
    fontSize: 16,
    fontWeight: '600',
  },
});
