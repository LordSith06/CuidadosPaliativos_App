import React, { useState, useEffect } from 'react';
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
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://10.0.1.20:3000/";

export default function AtendimentoScreen({ route, navigation }) {
  const [data, setData] = useState('');
  const [medico, setMedico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [loading, setLoading] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);

  const [modalListaVisible, setModalListaVisible] = useState(false);
  const [atendimentos, setAtendimentos] = useState([]);

  const [token, setToken] = useState('');

  // Estados novos para edição
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [atendimentoEditando, setAtendimentoEditando] = useState(null);

  useEffect(() => {
    const carregarToken = async () => {
      const t = await AsyncStorage.getItem("TOKEN");
      if (t) setToken(t);
    };
    carregarToken();
  }, []);

  const formatarData = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length > 2) value = value.replace(/^(\d{2})(\d)/, "$1/$2");
    if (value.length > 5) value = value.replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3");
    return value.substring(0, 10);
  };

  const parseJwt = (token) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      return JSON.parse(jsonPayload);
    } catch (e) {
      console.error('Erro ao decodificar token', e);
      return null;
    }
  };

  const cadastrarAtendimento = async () => {
    if (!data || !medico || !descricao) {
      setModalMessage("Preencha todos os campos!");
      setModalSuccess(false);
      setModalVisible(true)
      return;
    }

    try {
      const token = await AsyncStorage.getItem("TOKEN");
      if (!token) {
        setModalMessage("Token não encontrado. Faça login novamente!");
        setModalSuccess(false);
        setModalVisible(true);
        return;
      }

      const decoded = parseJwt(token);
      if (!decoded || !decoded.id) {
        setModalMessage("Token inválido!");
        setModalSuccess(false);
        setModalVisible(true);
        return;
      }

      const pacienteId = decoded.id;

      setLoading(true);

      const res = await fetch(`${BASE_URL}atendimento`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          data,
          medico,
          descricao,
          pacienteId
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Erro ao enviar atendimento");
      }

      setModalMessage("Atendimento cadastrado com sucesso!");
      setModalSuccess(true);
      setModalVisible(true);

      setData("");
      setMedico("");
      setDescricao("");

    } catch (err) {
      console.error("Erro ao cadastrar atendimento:", err);
      setModalMessage(err.message || "Erro ao cadastrar atendimento!");
      setModalSuccess(false);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  const listarAtendimentos = async () => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      if (!token) {
        setModalMessage("Token não encontrado. Faça login novamente!");
        setModalSuccess(false);
        setModalVisible(true);
        return;
      }

      const decoded = parseJwt(token);
      if (!decoded || !decoded.id) {
        setModalMessage("Token inválido!");
        setModalSuccess(false);
        setModalVisible(true);
        return;
      }

      const pacienteId = decoded.id;

      const res = await fetch(`${BASE_URL}atendimento`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Erro ao buscar atendimentos");
      }

      const data = await res.json();
      const meusAtendimentos = data.filter(a => a.pacienteId === pacienteId);

      setAtendimentos(meusAtendimentos);
      setModalListaVisible(true);

    } catch (err) {
      console.error("Erro ao listar atendimentos:", err);
      setModalMessage(err.message || "Erro ao listar atendimentos");
      setModalSuccess(false);
      setModalVisible(true);
    }
  };

  // 👉 FUNÇÃO DE SALVAR A EDIÇÃO (PUT)
  const handleSalvarEdicao = async () => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");

      const res = await fetch(`${BASE_URL}atendimento/${atendimentoEditando.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(atendimentoEditando)
      });

      if (!res.ok) throw new Error("Erro ao atualizar atendimento");

      setModalEditarVisible(false);
      listarAtendimentos();

      setModalMessage("Atendimento atualizado!");
      setModalSuccess(true);
      setModalVisible(true);

    } catch (e) {
      alert("Erro ao salvar edição");
      console.log(e);
    }
  };

  // 👉 FUNÇÃO DE EXCLUIR
  const handleExcluir = async (id) => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");

      const res = await fetch(`${BASE_URL}atendimento/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) throw new Error("Erro ao excluir");

      listarAtendimentos();

      setModalMessage("Atendimento excluído!");
      setModalSuccess(true);
      setModalVisible(true);

    } catch (e) {
      alert("Erro ao excluir");
      console.log(e);
    }
  };

  const fecharModal = () => {
    setModalVisible(false);
    if (modalSuccess) navigation.goBack();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Cadastro de Atendimento</Text>

      <Text style={styles.sectionTitle}>🩺 Informações do Atendimento</Text>

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
          placeholder="Ex: Acompanhamento"
          placeholderTextColor="#8396a4"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <TouchableOpacity
        style={[styles.btnCadastrar, loading && { opacity: 0.7 }]}
        disabled={loading}
        onPress={cadastrarAtendimento}
      >
        <Text style={styles.txtCadastrar}>
          {loading ? "Enviando..." : "Cadastrar Atendimento"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.btnCadastrar}
        onPress={listarAtendimentos}
      >
        <Text style={styles.txtCadastrar}>Listar Atendimentos</Text>
      </TouchableOpacity>

      {/* Modal da Lista de Atendimentos */}
      <Modal animationType="slide" transparent visible={modalListaVisible}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '90%', maxHeight: '80%' }]}>
            
            <Text style={styles.modalTitle}>Meus Atendimentos</Text>

            <ScrollView>
              {atendimentos.map((item, index) => (
                <View key={index} style={styles.card}>
                  <Text style={styles.label}>Data: {item.data}</Text>
                  <Text style={styles.label}>Médico: {item.medico}</Text>
                  <Text style={styles.label}>Descrição: {item.descricao}</Text>

                  <View style={styles.actionRow}>
                    
                    {/* EDITAR */}
                    <TouchableOpacity
                      onPress={() => {
                        setAtendimentoEditando(item);
                        setModalEditarVisible(true);
                      }}
                    >
                      <Icon name="edit" size={28} color="#37758a" />
                    </TouchableOpacity>

                    {/* EXCLUIR */}
                    <TouchableOpacity
                      onPress={() => handleExcluir(item.id)}
                    >
                      <Icon name="delete" size={28} color="#d9534f" />
                    </TouchableOpacity>

                  </View>
                </View>
              ))}
            </ScrollView>

            <TouchableOpacity
              style={[styles.modalButton, { marginTop: 10 }]}
              onPress={() => setModalListaVisible(false)}
            >
              <Text style={styles.modalButtonText}>Fechar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

      {/* Modal de EDIÇÃO */}
      <Modal animationType="slide" transparent visible={modalEditarVisible}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { width: '90%' }]}>
            
            <Text style={styles.modalTitle}>Editar Atendimento</Text>

            <TextInput
              style={styles.input}
              placeholder="Data"
              value={atendimentoEditando?.data || ""}
              onChangeText={(t) =>
                setAtendimentoEditando({ ...atendimentoEditando, data: t })
              }
            />

            <TextInput
              style={styles.input}
              placeholder="Médico"
              value={atendimentoEditando?.medico || ""}
              onChangeText={(t) =>
                setAtendimentoEditando({ ...atendimentoEditando, medico: t })
              }
            />

            <TextInput
              style={[styles.input, styles.textArea]}
              placeholder="Descrição"
              multiline
              value={atendimentoEditando?.descricao || ""}
              onChangeText={(t) =>
                setAtendimentoEditando({ ...atendimentoEditando, descricao: t })
              }
            />

            <TouchableOpacity
              style={styles.modalButton}
              onPress={handleSalvarEdicao}
            >
              <Text style={styles.modalButtonText}>Salvar Alterações</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.modalButton, { backgroundColor: "#777", marginTop: 10 }]}
              onPress={() => setModalEditarVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#ffffff', padding: 20 },
  title: { fontSize: 26, color: '#37758a', fontWeight: '700', textAlign: 'center', marginBottom: 20 },
  sectionTitle: { color: '#37758a', fontSize: 18, fontWeight: '700', marginBottom: 12, marginTop: 10 },
  card: { backgroundColor: '#d9e3e8', borderRadius: 15, padding: 15, marginBottom: 20 },
  label: { color: '#37758a', fontWeight: '600', fontSize: 16, marginTop: 10 },
  input: { backgroundColor: '#ffffff', borderRadius: 10, padding: 12, fontSize: 16, marginTop: 5, borderWidth: 1, borderColor: '#b6c4cc', color: '#333' },
  textArea: { height: 120, textAlignVertical: 'top' },
  btnCadastrar: { backgroundColor: '#37758a', padding: 15, borderRadius: 15, alignItems: 'center', marginTop: 10 },
  txtCadastrar: { color: '#ffffff', fontSize: 18, fontWeight: '700' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '80%', borderRadius: 20, padding: 25, alignItems: 'center', backgroundColor: '#fff' },
  modalSuccess: { backgroundColor: '#e8f5e9' },
  modalError: { backgroundColor: '#ffebee' },
  modalText: { fontSize: 18, textAlign: 'center', marginVertical: 15, color: '#333' },
  modalButton: { backgroundColor: '#37758a', borderRadius: 20, paddingVertical: 10, paddingHorizontal: 30 },
  modalButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  modalTitle: { fontSize: 22, fontWeight: '700', color: '#000', textAlign: 'center', marginBottom: 15 },
  actionRow: { flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', gap: 18, marginTop: 12 },
});
