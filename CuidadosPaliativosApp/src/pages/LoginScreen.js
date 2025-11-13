import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  Image,
  Modal
} from 'react-native';

const BASE_URL = "http://10.136.131.249:3000";

export default function LoginScreen({ navigation }) {

  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success'); // success | error

  const showModal = (message, type = 'success') => {
    setModalMessage(message);
    setModalType(type);
    setModalVisible(true);
    setTimeout(() => setModalVisible(false), 2000);
  };

  const handleLogin = async () => {
    if (!cpf || !senha) {
      showModal("Preencha o CPF e a senha!", "error");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cpf, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        showModal(data.message || "Usuário e/ou senha incorretos!", "error");
        return;
      }

      console.log("Token recebido:", data.token);
      showModal("Login realizado com sucesso!", "success");

      // Espera o modal desaparecer antes de navegar
      setTimeout(() => navigation.replace("MainTabs"), 2000);

    } catch (error) {
      console.error("Erro ao logar:", error);
      showModal("Erro de conexão com o servidor!", "error");
    }
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
      <TouchableOpacity 
        style={Estilo.btnCriar} 
        onPress={() => navigation.navigate('CriarConta')}
      >
        <Text style={Estilo.txtCriar}>Crie uma conta</Text>
      </TouchableOpacity>

      {/* Modal de feedback */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
      >
        <View style={Estilo.modalOverlay}>
          <View style={[
            Estilo.modalContent, 
            modalType === 'success' ? Estilo.modalSuccess : Estilo.modalError
          ]}>
            <Text style={Estilo.modalText}>{modalMessage}</Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}

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
  // Modal
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    padding: 25,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
  },
  modalText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
  },
  modalSuccess: {
    backgroundColor: '#2b6b87',
  },
  modalError: {
    backgroundColor: '#e04e4e',
  },
});
