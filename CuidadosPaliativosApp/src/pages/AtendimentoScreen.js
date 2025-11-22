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

      {/* 🔹 TÍTULO DA SEÇÃO (igual ao Medicamentos) */}
      <Text style={styles.sectionTitle}>🩺 Informações do Atendimento</Text>

      {/* 🔹 CARD */}
      <View style={styles.card}>

        <Text style={styles.label}>Data do Atendimento</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: 20/11/2024"
          placeholderTextColor="#8396a4"
          keyboardType="numeric"
          value={data}
          onChangeText={(t) => setData(formatarData(t))}
        />

        <Text style={styles.label}>Nome do Médico</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Dr. João"
          placeholderTextColor="#8396a4"
          value={medico}
          onChangeText={setMedico}
        />

        <Text style={styles.label}>Descrição do Atendimento</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Ex: Acompanhamento do quadro clínico"
          placeholderTextColor="#8396a4"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      {/* BOTÃO */}
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
    backgroundColor: '#ffffff',
    padding: 20,
  },

  title: {
    fontSize: 26,
    color: '#37758a',
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20,
  },

  sectionTitle: {
    color: '#37758a',
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
    marginTop: 10,
  },

  card: {
    backgroundColor: '#d9e3e8',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
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
    padding: 12,
    fontSize: 16,
    marginTop: 5,
    borderWidth: 1,
    borderColor: '#b6c4cc',
    color: '#333',
  },

  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },

  btnCadastrar: {
    backgroundColor: '#37758a',
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 10,
  },

  txtCadastrar: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '700',
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
    backgroundColor: '#37758a',
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
