import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  TextInput,
  Modal
} from 'react-native';

export default function TratamentoScreen() {

  const [lista, setLista] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [data, setData] = useState('');
  const [medico, setMedico] = useState('');
  const [descricao, setDescricao] = useState('');

  function novoRegistro() {
    setData('');
    setMedico('');
    setDescricao('');
    setModalVisible(true);
  }

  function salvar() {
    if (!data || !medico || !descricao) return;

    const item = {
      id: lista.length + 1,
      data,
      medico,
      descricao,
    };

    setLista([...lista, item]);
    setModalVisible(false);
  }

  return (
    <View style={styles.container}>

      <Text style={styles.titulo}>Atendimentos</Text>

      <FlatList
        data={lista}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.label}>{item.medico}</Text>
            <Text style={styles.texto}>Data: {item.data}</Text>
            <Text style={styles.texto}>Descrição: {item.descricao}</Text>
          </View>
        )}
      />

      <TouchableOpacity style={styles.botao} onPress={novoRegistro}>
        <Text style={styles.botaoTexto}>Novo</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} transparent animationType="fade">
        <View style={styles.modalFundo}>
          <View style={styles.modal}>
            <Text style={styles.subtitulo}>Novo Tratamento</Text>

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

            <TouchableOpacity style={styles.botaoSalvar} onPress={salvar}>
              <Text style={styles.botaoTexto}>Salvar</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.botaoCancelar}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.botaoTexto}>Cancelar</Text>
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
    backgroundColor: "#FFF",
    padding: 20
  },

  titulo: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 15
  },

  card: {
    backgroundColor: "#F4F4F4",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },

  label: {
    fontSize: 16,
    fontWeight: "bold"
  },

  texto: {
    fontSize: 14,
    marginTop: 3,
    color: "#444"
  },

  botao: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10
  },

  botaoTexto: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  },

  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.3)",
    justifyContent: "center",
    alignItems: "center",
  },

  modal: {
    backgroundColor: "#FFF",
    width: "85%",
    padding: 20,
    borderRadius: 10,
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15
  },

  input: {
    backgroundColor: "#EEE",
    padding: 10,
    borderRadius: 6,
    marginBottom: 10
  },

  botaoSalvar: {
    backgroundColor: "#007AFF",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 5
  },

  botaoCancelar: {
    backgroundColor: "#999",
    padding: 12,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8
  }
});
