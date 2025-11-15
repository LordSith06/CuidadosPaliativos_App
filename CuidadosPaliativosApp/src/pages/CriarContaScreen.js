import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';

const BASE_URL = "http://localhost:3000/";

export default function CriarContaScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [medicacao, setMedicacao] = useState('');
  const [medico, setMedico] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [loading, setLoading] = useState(false);
  const formatarData = (value) => {
  value = value.replace(/\D/g, ""); // remove tudo que não é número

  if (value.length > 2) {
    value = value.replace(/^(\d{2})(\d)/, "$1/$2");
   }
    if (value.length > 5) {
    value = value.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    }

  return value.substring(0, 10); // DD/MM/AAAA no máximo
  };


  

  // Estado do modal
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  const criarConta = async (paciente) => {
    try {
      const res = await fetch(`${BASE_URL}adicionarpaciente`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paciente)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      return true;
    } catch (error) {
      console.error("Erro ao criar paciente:", error);
      return false;
    }
  };

  const handleCriarConta = async () => {
    if (!nome || !cpf || !senha || !confirmarSenha || !medico || !medicacao || !diagnostico || !dataNascimento) {
      setModalMessage("Preencha todos os campos!");
      setModalSuccess(false);
      setModalVisible(true);
      return;
    }

    if (senha !== confirmarSenha) {
      setModalMessage("As senhas não coincidem!");
      setModalSuccess(false);
      setModalVisible(true);
      return;
    }

    setLoading(true);

    const paciente = {
      nome,
      cpf,
      senha,
      medicacao,
      medico_responsavel: medico,
      diagnostico,
      dataNascimento
    };

    const sucesso = await criarConta(paciente);

    if (sucesso) {
      setModalMessage("Conta criada com sucesso!");
      setModalSuccess(true);
      setModalVisible(true);

      // Limpa campos
      setNome("");
      setCpf("");
      setSenha("");
      setConfirmarSenha("");
      setMedicacao("");
      setMedico("");
      setDiagnostico("");
      setDataNascimento("");
    } else {
      setModalMessage("Erro ao criar conta, tente novamente!");
      setModalSuccess(false);
      setModalVisible(true);
    }

    setLoading(false);
  };

  const fecharModal = () => {
    setModalVisible(false);
    if (modalSuccess) navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={Estilo.container}>
      {/* Botão Voltar */}
      <TouchableOpacity style={Estilo.btnVoltar} onPress={() => navigation.goBack()}>
        <Icon name="arrow-back" size={24} color="#fff" />
        <Text style={Estilo.txtVoltar}>Voltar</Text>
      </TouchableOpacity>

      <Text style={Estilo.title}>Criar Conta</Text>

      {/* Campos */}
      <TextInput style={Estilo.input} placeholder="Nome" placeholderTextColor="#d9e3e8" value={nome} onChangeText={setNome} />
      <TextInput style={Estilo.input} placeholder="CPF" placeholderTextColor="#d9e3e8" value={cpf} onChangeText={setCpf} />
      <TextInput style={Estilo.input} placeholder="Senha" placeholderTextColor="#d9e3e8" secureTextEntry value={senha} onChangeText={setSenha} />
      <TextInput style={Estilo.input} placeholder="Confirmar Senha" placeholderTextColor="#d9e3e8" secureTextEntry value={confirmarSenha} onChangeText={setConfirmarSenha} />
      <TextInput style={Estilo.input} placeholder="Medicação" placeholderTextColor="#d9e3e8" value={medicacao} onChangeText={setMedicacao} />
      <TextInput style={Estilo.input} placeholder="Médico Responsável" placeholderTextColor="#d9e3e8" value={medico} onChangeText={setMedico} />
      <TextInput
        style={[Estilo.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Diagnóstico"
        placeholderTextColor="#d9e3e8"
        multiline
        value={diagnostico}
        onChangeText={setDiagnostico}
      />
      <TextInput /*Obriga o usuário a colocar somente números nesse campo*/
      style={Estilo.input}
      placeholder="Data de Nascimento"
      placeholderTextColor="#d9e3e8"
      keyboardType="numeric"
      value={dataNascimento}
      onChangeText={(text) => setDataNascimento(formatarData(text))}
      />

      {/* Botão Criar Conta */}
      <TouchableOpacity 
        style={[Estilo.btnCriar, loading && { opacity: 0.7 }]} 
        onPress={handleCriarConta}
        disabled={loading}
      >
        <Text style={Estilo.txtCriar}>
          {loading ? 'Enviando...' : 'Criar Conta'}
        </Text>
      </TouchableOpacity>

      {/* Modal de Sucesso/Erro */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={fecharModal}
      >
        <View style={Estilo.modalOverlay}>
          <View style={[Estilo.modalContent, modalSuccess ? Estilo.modalSuccess : Estilo.modalError]}>
            <Icon 
              name={modalSuccess ? "check-circle" : "error"} 
              size={50} 
              color={modalSuccess ? "#4CAF50" : "#f44336"} 
            />
            <Text style={Estilo.modalText}>{modalMessage}</Text>
            <TouchableOpacity style={Estilo.modalButton} onPress={fecharModal}>
              <Text style={Estilo.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const Estilo = StyleSheet.create({
  container: {
    flexGrow: 1,
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
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '80%',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
  },
  modalSuccess: {
    backgroundColor: '#e8f5e9',
  },
  modalError: {
    backgroundColor: '#ffebee',
  },
  modalText: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#2b6b87',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
});
