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

const BASE_URL = "http://localhost:3000/";

export default function AtendimentoScreen({ route, navigation }) {
  const { pacienteId } = route.params || {}; 

  const [data, setData] = useState('');
  const [medico, setMedico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  const formatarData = (value) => {
    value = value.replace(/\D/g, "");

    if (value.length > 2) {
      value = value.replace(/^(\d{2})(\d)/, "$1/$2");
    }
    if (value.length > 5) {
      value = value.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    }

    return value.substring(0, 10);
  };

  const cadastrarAtendimento = async () => {

    if (!data || !medico || !descricao) {
      setModalMessage("Preencha todos os campos!");
      setModalSuccess(false);
      setModalVisible(true);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${BASE_URL}adicionaratendimento`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          data,
          medico,
          descricao,
          pacienteId
        })
      });

      if (!res.ok) throw new Error("Erro ao enviar atendimento");

      setModalMessage("Atendimento cadastrado com sucesso!");
      setModalSuccess(true);
      setModalVisible(true);

      setData("");
      setMedico("");
      setDescricao("");

    } catch (err) {
      setModalMessage("Erro ao cadastrar atendimento!");
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
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Atendimento</Text>

      <TextInput
        style={styles.input}
        placeholder="Data do Atendimento"
        placeholderTextColor="#d9e3e8"
        keyboardType="numeric"
        value={data}
        onChangeText={(t) => setData(formatarData(t))}
      />

      <TextInput
        style={styles.input}
        placeholder="Nome do Médico"
        placeholderTextColor="#d9e3e8"
        value={medico}
        onChangeText={setMedico}
      />

      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Descrição do Atendimento"
        placeholderTextColor="#d9e3e8"
        multiline
        value={descricao}
        onChangeText={setDescricao}
      />

      <TouchableOpacity
        style={[styles.btnCadastrar, loading && { opacity: 0.7 }]}
        disabled={loading}
        onPress={cadastrarAtendimento}
      >
        <Text style={styles.txtCadastrar}>
          {loading ? "Enviando..." : "Cadastrar Atendimento"}
        </Text>
      </TouchableOpacity>

      {/* MODAL */}
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalOverlay}>
          <View
            style={[
              styles.modalContent,
              modalSuccess ? styles.modalSuccess : styles.modalError
            ]}
          >
            <Icon
              name={modalSuccess ? "check-circle" : "error"}
              size={55}
              color={modalSuccess ? "#4CAF50" : "#f44336"}
            />
            <Text style={styles.modalText}>{modalMessage}</Text>

            <TouchableOpacity style={styles.modalButton} onPress={fecharModal}>
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#37758a',
    padding: 20,
  },

  title: {
    fontSize: 28,
    color: '#FFD43B',
    fontWeight: '700',
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

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  btnCadastrar: {
    backgroundColor: '#d9e3e8',
    width: '100%',
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },

  txtCadastrar: {
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
    fontSize: 16,
    fontWeight: '600',
  },
});
