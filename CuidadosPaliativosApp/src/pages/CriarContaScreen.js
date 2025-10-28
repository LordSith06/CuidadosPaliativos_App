import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  Alert 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const BASE_URL = "http://localhost:3000/";

export default function CriarContaScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [medicacao, setMedicacao] = useState('');
  const [medico, setMedico] = useState('');
  const [diagnostico, setDiagnostico] = useState('');
  const [loading, setLoading] = useState(false);

  // Função para enviar o POST ao backend
  const criarConta = async (paciente) => {
    try {
      const res = await fetch(`${BASE_URL}adicionarpaciente`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(paciente)
      });

      if (!res.ok) {
        const errText = await res.text();
        throw new Error(errText);
      }

      const data = await res.json();
      console.log("✅ Resposta do backend:", data);
      return true;
    } catch (error) {
      console.error("❌ Erro ao criar paciente:", error);
      return false;
    }
  };

  const handleCriarConta = async () => {
    if (!nome || !cpf || !senha || !confirmarSenha || !medico || !medicacao || !diagnostico) {
      Alert.alert("Atenção", "Preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      Alert.alert("Erro", "As senhas não coincidem!");
      return;
    }

    setLoading(true);

    const paciente = {
      nome,
      cpf,
      senha,
      medicacao,
      medico_responsavel: medico,
      diagnostico
    };

    const sucesso = await criarConta(paciente);

    if (sucesso) {
      Alert.alert("Sucesso", "Conta criada com sucesso!");
      setNome("");
      setCpf("");
      setSenha("");
      setConfirmarSenha("");
      setMedicacao("");
      setMedico("");
      setDiagnostico("");
      navigation.goBack(); // volta para a tela anterior
    } else {
      Alert.alert("Erro", "Erro ao criar conta, tente novamente!");
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={Estilo.container}>
      {/* Botão Voltar */}
      <TouchableOpacity style={Estilo.btnVoltar} onPress={() => navigation.goBack()}>
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
      <TextInput
        style={Estilo.input}
        placeholder="Medicação"
        placeholderTextColor="#d9e3e8"
        value={medicacao}
        onChangeText={setMedicacao}
      />
      <TextInput
        style={Estilo.input}
        placeholder="Médico Responsável"
        placeholderTextColor="#d9e3e8"
        value={medico}
        onChangeText={setMedico}
      />
      <TextInput
        style={[Estilo.input, { height: 100, textAlignVertical: 'top' }]}
        placeholder="Diagnóstico"
        placeholderTextColor="#d9e3e8"
        multiline
        value={diagnostico}
        onChangeText={setDiagnostico}
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
});
