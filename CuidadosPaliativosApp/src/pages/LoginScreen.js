
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image 
} from 'react-native';


export default function LoginScreen({ navigation }) {

  // Hooks para controlar os campos de texto
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');


  const handleLogin = () => {
    // Aqui futuramente vai ser adicionada a validação real
    navigation.replace('MainTabs');
  };

  return (
    <View style={Estilo.container}>
      {/* Logo */}
      <Image 
        source={require('../assets/img/logo.jpg')} 
        style={Estilo.logo}
      />

      {/* Título */}
      <Text style={Estilo.title}>Cuidados</Text>
      <Text style={Estilo.subtitle}>Paliativos</Text>

      {/* Campo CPF */}
      <TextInput
        style={Estilo.input}
        placeholder="CPF"
        placeholderTextColor="#d9e3e8"
        value={cpf}
        onChangeText={setCpf}
      />

      {/* Campo Senha */}
      <TextInput
        style={Estilo.input}
        placeholder="Senha"
        placeholderTextColor="#d9e3e8"
        secureTextEntry
        value={senha}
        onChangeText={setSenha}
      />

      {/* Link esqueci senha */}
      <TouchableOpacity>
        <Text style={Estilo.link}>Esqueceu sua senha?</Text>
      </TouchableOpacity>

      {/* Botão Login */}
      <TouchableOpacity style={Estilo.btnLogin} onPress={handleLogin}>
        <Text style={Estilo.txtLogin}>Login</Text>
      </TouchableOpacity>

      {/* Separador */}
      <Text style={Estilo.ou}>ou</Text>

      {/* Botão Criar Conta */}
      <TouchableOpacity style={Estilo.btnCriar}>
        <Text style={Estilo.txtCriar}>Crie uma conta</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos da tela
const Estilo = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#37758a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  title: {
    fontSize: 40,
    fontWeight: '700',
    color: '#FFD43B',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#ffffff',
    marginBottom: 30,
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
  link: {
    color: '#fff',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'right',
    width: '100%',
  },
  btnLogin: {
    backgroundColor: '#2b6b87',
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  txtLogin: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  ou: {
    color: '#fff',
    fontSize: 16,
    marginVertical: 10,
  },
  btnCriar: {
    backgroundColor: '#d9e3e8',
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtCriar: {
    color: '#2b6b87',
    fontSize: 16,
    fontWeight: '600',
  },
});
