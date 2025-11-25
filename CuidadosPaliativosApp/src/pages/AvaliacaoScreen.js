import React, { useState } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,ScrollView,Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function AvaliacaoScreen() {
  const [estrelas, setEstrelas] = useState(0);
  const [descricao, setDescricao] = useState('');
  const [modalSucesso, setModalSucesso] = useState(false);
  const [modalErro, setModalErro] = useState(false);

  const enviarAvaliacao = () => {
    if (estrelas === 0 || descricao.trim() === '') {
      setModalErro(true);
      return;
    }

    // Aqui você chamaria sua API, por enquanto simulamos sucesso
    setModalSucesso(true);
    setEstrelas(0);
    setDescricao('');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.sectionTitle}>⭐ Avalie nosso serviço</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Sua avaliação</Text>
        <View style={styles.starsRow}>
          {[1,2,3,4,5].map((num) => (
            <TouchableOpacity key={num} onPress={() => setEstrelas(num)}>
              <Icon 
                name={num <= estrelas ? "star" : "star-border"} 
                size={40} 
                color="#FFD700" 
              />
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Comentários</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Escreva sua avaliação..."
          placeholderTextColor="#8396a4"
          multiline
          value={descricao}
          onChangeText={setDescricao}
        />
      </View>

      <TouchableOpacity
        style={styles.btnEnviar}
        onPress={enviarAvaliacao}
      >
        <Text style={styles.txtEnviar}>Enviar Avaliação</Text>
      </TouchableOpacity>

      {/* Modal Sucesso */}
      <Modal animationType="fade" transparent visible={modalSucesso}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalSucessoBox]}>
            <Icon
              name="check-circle"
              size={55}
              color="#4CAF50"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.modalSucessoMessage}>
              Avaliação enviada com sucesso!
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalSucesso(false)}
            >
              <Text style={styles.modalButtonText}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Modal Erro */}
      <Modal animationType="fade" transparent visible={modalErro}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, styles.modalErrorBox]}>
            <Icon
              name="error"
              size={55}
              color="#f44336"
              style={{ marginBottom: 10 }}
            />
            <Text style={styles.modalTitle}>Atenção</Text>
            <Text style={styles.modalErrorMessage}>
              Por favor, selecione uma avaliação e escreva um comentário.
            </Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => setModalErro(false)}
            >
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
    justifyContent: 'center'
  },

  sectionTitle: { 
    color: '#37758a', 
    fontSize: 22, 
    fontWeight: '700',
    marginBottom: 20,
    textAlign: 'center'
  },

  card: { 
    backgroundColor: '#d9e3e8',
    borderRadius: 15, 
    padding: 15,
    marginBottom: 20
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
    padding: 12,
    marginTop: 5,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#b6c4cc', 
    color: '#333'
  },

  textArea: { 
    height: 100, 
    textAlignVertical: 'top' 
  },

  starsRow: {
    flexDirection: 'row',
    marginVertical: 10,
    gap: 10
  },

  btnEnviar: { 
    backgroundColor: '#37758a', 
    padding: 15, 
    borderRadius: 15, 
    alignItems: 'center', 
    marginTop: 10 
  },

  txtEnviar: { 
    color: '#ffffff', 
    fontSize: 18, 
    fontWeight: '700' 
  },

  // MODAIS -----------------------------------------
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

  modalTitle: { 
    fontSize: 22, 
    fontWeight: '700', 
    color: '#37758a', 
    textAlign: 'center', 
    marginBottom: 15 
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
    fontWeight: '700' 
  },

  // Modal de ERRO
  modalErrorBox: {
    backgroundColor: "#ffebee",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    paddingTop: 25
  },

  modalErrorMessage: {
    fontSize: 17,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20
  },

  // Modal de SUCESSO
  modalSucessoBox: {
    backgroundColor: "#e8f5e9",
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    paddingTop: 25
  },

  modalSucessoMessage: {
    fontSize: 18,
    color: "#2e7d32",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "600"
  }
});
