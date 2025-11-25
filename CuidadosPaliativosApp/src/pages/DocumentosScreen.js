import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  Modal 
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = "http://192.168.0.226:3000/";

export default function CadastroMedicamentoScreen({ navigation }) {
  const [nome, setNome] = useState('');
  const [mg, setMg] = useState('');
  const [descricao, setDescricao] = useState('');

  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalSuccess, setModalSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const [modalListaVisible, setModalListaVisible] = useState(false);
  const [medicamentos, setMedicamentos] = useState([]);

  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [editNome, setEditNome] = useState('');
  const [editMg, setEditMg] = useState('');
  const [editDescricao, setEditDescricao] = useState('');
  const [loadingEdit, setLoadingEdit] = useState(false);

  // ---------------------------------------------------------
  // Modal de edição
  // ---------------------------------------------------------
  const abrirModalEdicao = (item) => {
    if (!item || !item.id) {
      console.warn("Item inválido na edição:", item);
      return;
    }

    setEditId(item.id);

    setEditNome(String(item.nome || ""));

    const mgValue =
      item.miligramagem ??
      item.mg ??
      item.miligramas ??
      item.miligramagemText ??
      "";

    setEditMg(String(mgValue));

    setEditDescricao(String(item.descricao || ""));

    setModalEditarVisible(true);
  };

  // ---------------------------------------------------------
  // Salvar medicamento
  // ---------------------------------------------------------
  const handleSalvar = async () => {
    if (!nome || !mg || !descricao) {
      setModalMessage("Preencha todos os campos!");
      setModalSuccess(false);
      setModalVisible(true);
      return;
    }

    try {
      setLoading(true);

      const token = await AsyncStorage.getItem("TOKEN");
      if (!token) {
        setModalMessage("Token não encontrado. Faça login novamente!");
        setModalSuccess(false);
        setModalVisible(true);
        return;
      }

      const decoded = (() => {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch {
          return null;
        }
      })();
      const pacienteId = decoded?.id;

      const res = await fetch(`${BASE_URL}medicamentos`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          nome,
          miligramagem: mg,
          descricao,
          pacienteId
        })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Erro ao cadastrar medicamento");
      }

      const created = await res.json().catch(() => null);
      if (created && created.id) {
        setMedicamentos(prev => [ ...(prev || []), created ]);
      }

      setModalMessage("Medicamento cadastrado com sucesso!");
      setModalSuccess(true);
      setModalVisible(true);

      setNome("");
      setMg("");
      setDescricao("");

    } catch (err) {
      console.error("Erro ao cadastrar medicamento:", err);
      setModalMessage(err.message || "Erro ao cadastrar medicamento!");
      setModalSuccess(false);
      setModalVisible(true);
    } finally {
      setLoading(false);
    }
  };

  // ---------------------------------------------------------
  // Listar medicamentos
  // ---------------------------------------------------------
  const listarMedicamentos = async () => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      if (!token) {
        setModalMessage("Token não encontrado. Faça login novamente!");
        setModalSuccess(false);
        setModalVisible(true);
        return;
      }

      const decoded = (() => {
        try {
          return JSON.parse(atob(token.split('.')[1]));
        } catch {
          return null;
        }
      })();
      const pacienteId = decoded?.id;

      const res = await fetch(`${BASE_URL}medicamentos`, {
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.message || "Erro ao buscar medicamentos");
      }

      const data = await res.json();
      const meusMedicamentos = (data.medicamentos || []).filter(m => m.pacienteId == pacienteId);

      setMedicamentos(meusMedicamentos);
      setModalListaVisible(true);

    } catch (err) {
      console.error("Erro ao listar medicamentos:", err);
      setModalMessage(err.message || "Erro ao listar medicamentos");
      setModalSuccess(false);
      setModalVisible(true);
    }
  };

  // ---------------------------------------------------------
  // Excluir medicamento
  // ---------------------------------------------------------
  const excluirMedicamento = async (id) => {
    try {
      const token = await AsyncStorage.getItem("TOKEN");
      if (!token) {
        setModalMessage("Token não encontrado. Faça login novamente!");
        setModalSuccess(false);
        setModalVisible(true);
        return;
      }

      const res = await fetch(`${BASE_URL}medicamentos/${id}`, {
        method: "DELETE",
        headers: { "Authorization": `Bearer ${token}` }
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        throw new Error(err.message || "Erro ao excluir medicamento");
      }

      setMedicamentos(prev => prev.filter(m => m.id !== id));

      setModalMessage("Medicamento excluído!");
      setModalSuccess(true);
      setModalVisible(true);

    } catch (err) {
      console.log("Erro ao excluir:", err);
      setModalMessage(err.message || "Erro ao excluir medicamento");
      setModalSuccess(false);
      setModalVisible(true);
    }
  };

  // ---------------------------------------------------------
  // Salvar edição
  // ---------------------------------------------------------
const salvarEdicao = async () => {
  if (!editId) {
    setModalMessage("Erro: medicamento inválido para editar.");
    setModalSuccess(false);
    setModalVisible(true);
    return;
  }
  if (!editNome || !editMg || !editDescricao) {
    setModalMessage("Preencha todos os campos da edição!");
    setModalSuccess(false);
    setModalVisible(true);
    return;
  }

  try {
    setLoadingEdit(true);

    const token = await AsyncStorage.getItem("TOKEN");
    if (!token) {
      setModalMessage("Token não encontrado. Faça login novamente!");
      setModalSuccess(false);
      setModalVisible(true);
      return;
    }

    // Decodifica pacienteId do token
    const decoded = (() => {
      try {
        return JSON.parse(atob(token.split('.')[1]));
      } catch {
        return null;
      }
    })();
    const pacienteId = decoded?.id;

    const res = await fetch(`${BASE_URL}medicamentos/${editId}`, {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        nome: editNome,
        miligramagem: editMg,
        descricao: editDescricao,
        pacienteId // ✅ agora incluído
      })
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.message || "Erro ao editar medicamento");
    }

    setMedicamentos(prev => prev.map(m => 
      m.id === editId ? { ...m, nome: editNome, miligramagem: editMg, descricao: editDescricao } : m
    ));

    setModalEditarVisible(false);
    setModalMessage("Medicamento atualizado!");
    setModalSuccess(true);
    setModalVisible(true);

  } catch (err) {
    console.log("Erro ao editar:", err);
    setModalMessage(err.message || "Erro ao editar medicamento");
    setModalSuccess(false);
    setModalVisible(true);
  } finally {
    setLoadingEdit(false);
  }
};


  const fecharModal = () => {
    setModalVisible(false);
  };

  // ---------------------------------------------------------
  // RETORNO DA TELA
  // ---------------------------------------------------------
  return (
    <View style={Estilo.container}>
      <ScrollView style={Estilo.content}>
        <Text style={Estilo.sectionTitle}>💊 Informações do Medicamento</Text>

        <View style={Estilo.card}>
          <Text style={Estilo.label}>Nome do medicamento</Text>
          <TextInput
            style={Estilo.input}
            placeholder="Ex: Paracetamol"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={Estilo.label}>Miligramagem</Text>
          <TextInput
            style={Estilo.input}
            placeholder="Ex: 500mg"
            value={mg}
            onChangeText={setMg}
          />

          <Text style={Estilo.label}>Descrição / Observações</Text>
          <TextInput
            style={[Estilo.input, { height: 100 }]}
            placeholder="Ex: Tomar de 8 em 8 horas"
            value={descricao}
            onChangeText={setDescricao}
            multiline
          />
        </View>

        <TouchableOpacity 
          style={[Estilo.botao, loading && { opacity: 0.7 }]} 
          onPress={handleSalvar}
          disabled={loading}
        >
          <Text style={Estilo.botaoTexto}>
            {loading ? "Enviando..." : "Salvar Medicamento"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={Estilo.botao} 
          onPress={listarMedicamentos}
        >
          <Text style={Estilo.botaoTexto}>Lista de Medicamentos</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Modal mensagens */}
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={Estilo.modalOverlay}>
          <View style={[Estilo.modalContent, modalSuccess ? Estilo.modalSuccess : Estilo.modalError]}>
            <Icon 
              name={modalSuccess ? "check-circle" : "error"} 
              size={55} 
              color={modalSuccess ? "#4CAF50" : "#f44336"} 
            />
            <Text style={Estilo.modalText}>{modalMessage}</Text>

            <TouchableOpacity style={Estilo.modalButton} onPress={fecharModal}>
              <Text style={Estilo.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal lista medicamentos */}
      <Modal animationType="slide" transparent visible={modalListaVisible}>
        <View style={Estilo.modalOverlay}>
          <View style={[Estilo.modalContent, { width: "90%", maxHeight: "80%" }]}>
            <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 15, color: "#000" }}>
              Meus Medicamentos
            </Text>

            <ScrollView>
  {medicamentos.map((item) => (
    <View key={item.id} style={Estilo.card}>
      
      <Text style={Estilo.label}>Nome: {item.nome}</Text>
      <Text style={Estilo.label}>
        Miligramagem: {item.miligramagem || item.mg || item.miligramas}
      </Text>
      <Text style={Estilo.label}>Descrição: {item.descricao}</Text>

      {/* ROW DE AÇÕES - EDITAR / EXCLUIR */}
      <View style={{ flexDirection: "row", justifyContent: "flex-end", alignItems: "center", gap: 18, marginTop: 12 }}>
        
        {/* EDITAR */}
        <TouchableOpacity onPress={() => abrirModalEdicao({
          ...item,
          miligramagem: item.miligramagem || item.mg || item.miligramas
        })}>
          <Icon name="edit" size={28} color="#37758a" />
        </TouchableOpacity>

        {/* EXCLUIR */}
        <TouchableOpacity onPress={() => excluirMedicamento(item.id)}>
          <Icon name="delete" size={28} color="#d9534f" />
        </TouchableOpacity>

      </View>
    </View>
  ))}
</ScrollView>

            <TouchableOpacity
              style={[Estilo.modalButton, { marginTop: 10 }]}
              onPress={() => setModalListaVisible(false)}
            >
              <Text style={Estilo.modalButtonText}>Fechar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal edição */}
      <Modal animationType="slide" transparent visible={modalEditarVisible}>
        <View style={Estilo.modalOverlay}>
          <View style={[Estilo.modalContent, { width: "90%" }]}>
            <Text style={{ fontSize: 20, fontWeight: "700", marginBottom: 15, color: "#000" }}>
              Editar Medicamento
            </Text>

            <Text style={Estilo.label}>Nome</Text>
            <TextInput
              style={Estilo.input}
              value={editNome}
              onChangeText={setEditNome}
            />

            <Text style={Estilo.label}>Miligramagem</Text>
            <TextInput
              style={Estilo.input}
              value={editMg}
              onChangeText={setEditMg}
            />

            <Text style={Estilo.label}>Descrição</Text>
            <TextInput
              style={[Estilo.input, { height: 100 }]}
              value={editDescricao}
              onChangeText={setEditDescricao}
              multiline
            />

            <TouchableOpacity 
              style={[Estilo.botao, { marginTop: 20 }]}
              onPress={salvarEdicao}
              disabled={loadingEdit}
            >
              <Text style={Estilo.botaoTexto}>
                {loadingEdit ? "Salvando..." : "Salvar Alterações"}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={[Estilo.modalButton, { marginTop: 10 }]}
              onPress={() => setModalEditarVisible(false)}
            >
              <Text style={Estilo.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const Estilo = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#ffffff' },
  content: { padding: 20 },

  sectionTitle: { 
    color: '#37758a', 
    fontSize: 18, 
    fontWeight: '700', 
    marginBottom: 8, 
    marginTop: 10 
  },

  card: { 
    backgroundColor: '#d9e3e8', 
    borderRadius: 15, 
    padding: 15, 
    marginBottom: 15 
  },

  label: { 
    color: '#37758a', 
    fontWeight: '600', 
    fontSize: 16, 
    marginTop: 10 
  },

  input: { 
    backgroundColor: '#ffffff', 
    borderRadius: 10, 
    padding: 10, 
    marginTop: 5, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#b6c4cc' 
  },

  botao: { 
    backgroundColor: '#37758a', 
    padding: 15, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 10 
  },

  botaoTexto: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: '700' 
  },

  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,0,0,0.6)', 
    justifyContent: 'center', 
    alignItems: 'center' 
  },

  modalContent: { 
    width: '80%', 
    borderRadius: 20, 
    padding: 25, 
    alignItems: 'center', 
    backgroundColor: '#fff' 
  },

  modalSuccess: { backgroundColor: '#e8f5e9' },
  modalError: { backgroundColor: '#ffebee' },

  modalText: { 
    fontSize: 18, 
    textAlign: 'center', 
    marginVertical: 15, 
    color: '#333' 
  },

  modalButton: { 
    backgroundColor: '#37758a', 
    borderRadius: 20, 
    paddingVertical: 10, 
    paddingHorizontal: 30, 
    marginTop: 10 
  },

  modalButtonText: { 
    color: '#fff', 
    fontSize: 16, 
    fontWeight: '600' 
  },
});
