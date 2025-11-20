import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

export default function AtendimentoScreen() {
  
  const [atendimentos, setAtendimentos] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  // Campos do formulário
  const [data, setData] = useState('');
  const [medico, setMedico] = useState('');
  const [descricao, setDescricao] = useState('');
  const [pacienteId, setPacienteId] = useState('');

  function abrirFormulario() {
    setData('');
    setMedico('');
    setDescricao('');
    setPacienteId('');
    setModalVisible(true);
  }

  function salvarAtendimento() {
    const novo = {
      id: atendimentos.length + 1,
      data,
      medico,
      descricao,
      pacienteId
    };

    setAtendimentos([...atendimentos, novo]);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Atendimentos</Text>

      {/* Lista */}
      <FlatList
        data={atendimentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.cardTitulo}>{item.medico}</Text>
            <Text style={styles.cardTexto}>Data: {item.data}</Text>
            <Text style={styles.cardTexto}>Descrição: {item.descricao}</Text>
            <Text style={styles.cardTexto}>Paciente ID: {item.pacienteId}</Text>
          </View>
        )}
      />

      {/* Botão flutuante */}
      <TouchableOpacity style={styles.fab} onPress={abrirFormulario}>
        <Icon name="plus" size={22} color="#fff" />
      </TouchableOpacity>

      {/* Formulário Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalFundo}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitulo}>Novo Atendimento</Text>

            <TextInput
              placeholder="Data"
              style={styles.input}
              value={data}
              onChangeText={setData}
            />

            <TextInput
              placeholder="Médico"
              style={styles.input}
              value={medico}
              onChangeText={setMedico}
            />

            <TextInput
              placeholder="Descrição"
              style={[styles.input, { height: 70 }]}
              multiline
              value={descricao}
              onChangeText={setDescricao}
            />

            <TextInput
              placeholder="Paciente ID"
              style={styles.input}
              value={pacienteId}
              onChangeText={setPacienteId}
            />

            <TouchableOpacity style={styles.btnSalvar} onPress={salvarAtendimento}>
              <Text style={styles.btnTexto}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnCancelar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.btnTexto}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    padding: 20
  },

  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: "#333",
    marginBottom: 20
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3
  },

  cardTitulo: {
    fontSize: 18,
    fontWeight: 'bold',
    color: "#333"
  },

  cardTexto: {
    fontSize: 14,
    color: "#555",
    marginTop: 4
  },

  fab: {
    backgroundColor: "#0066FF",
    width: 60,
    height: 60,
    borderRadius: 30,
    position: "absolute",
    right: 20,
    bottom: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5
  },

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center"
  },

  modalCard: {
    backgroundColor: "#fff",
    width: "85%",
    padding: 20,
    borderRadius: 15
  },

  modalTitulo: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15
  },

  input: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10
  },

  btnSalvar: {
    backgroundColor: "#0066FF",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },

  btnCancelar: {
    backgroundColor: "#999",
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10
  },

  btnTexto: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold"
  }
});
