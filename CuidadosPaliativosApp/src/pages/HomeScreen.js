import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Platform,
  TouchableOpacity,
  Modal
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MenuButton from '../components/MenuButton';

// Imagens
import prontuario from '../assets/img/prontuario.jpg';
import documento from '../assets/img/documento.jpg';
import sintomas from '../assets/img/sintomas.jpg';
import informacoes from '../assets/img/informações.jpg';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogoutConfirm = async () => {
    try {
      await AsyncStorage.removeItem('token');
      setModalVisible(false);
      navigation.replace('Login'); // volta pra tela de login
    } catch (err) {
      console.error('Erro ao deslogar:', err);
      setModalVisible(false);
    }
  };

  return (
    <SafeAreaView style={Estilo.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <View style={Estilo.container}>
        {/* Cabeçalho */}
        <View style={Estilo.header}>
          {/* Botão de Sair */}
          <TouchableOpacity onPress={() => setModalVisible(true)} style={Estilo.btnSair}>
            <Icon name="sign-out-alt" size={18} color="#FFD700" />
            <Text style={Estilo.txtSair}>Sair</Text>
          </TouchableOpacity>

          {/* Título */}
          <View style={Estilo.headerTitleContainer}>
            <Icon name="heartbeat" size={30} color="#FFD700" style={Estilo.headerIcon}/>
            <View style={Estilo.logoContainer}>
              <Text style={Estilo.headerTextSmall}>O QUE SÃO</Text>
              <Text style={Estilo.headerTextLarge}>Cuidados</Text>
              <Text style={Estilo.headerTextLargeYellow}>Paliativos?</Text>
            </View>
          </View>

          <View style={Estilo.headerSeparator} />
        </View>

        {/* Conteúdo principal */}
        <View style={Estilo.mainContent}>
          <View style={Estilo.menuRow}>
            <MenuButton text="DIÁRIO DE SINTOMAS" image={sintomas} screen="Sintomas" />
            <MenuButton text="ATENDIMENTOS" image={informacoes} screen="Atendimentos" />
          </View>
          <View style={Estilo.menuRow}>
            <MenuButton text="HISTÓRICO CLÍNICO" image={prontuario} screen="Prontuario" />
            <MenuButton text="MENDICAMENTO" image={documento} screen="Documentos" />
          </View>
        </View>
      </View>

      {/* Modal de confirmação de logout */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={Estilo.modalOverlay}>
          <View style={Estilo.modalContainer}>
            <Icon name="sign-out-alt" size={40} color="#37758a" style={{ marginBottom: 10 }} />
            <Text style={Estilo.modalTitle}>Deseja realmente sair?</Text>
            <Text style={Estilo.modalMessage}>Você será desconectado da sua conta.</Text>

            <View style={Estilo.modalButtons}>
              <TouchableOpacity style={[Estilo.btnModal, Estilo.btnCancelar]} onPress={() => setModalVisible(false)}>
                <Text style={Estilo.txtBtnCancelar}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity style={[Estilo.btnModal, Estilo.btnConfirmar]} onPress={handleLogoutConfirm}>
                <Text style={Estilo.txtBtnConfirmar}>Sair</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const Estilo = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#37758a' },
  container: { flex: 1, backgroundColor: '#37758a' },
  header: { padding: 20, paddingTop: 30 },
  headerTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  btnSair: {
    position: 'absolute',
    left: 15,
    top: Platform.OS === 'android' ? 10 : 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  txtSair: {
    color: '#FFD700',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
  headerIcon: { marginRight: 15 },
  logoContainer: { alignItems: 'center' },
  headerTextSmall: { color: 'white', fontSize: 16, fontWeight: '300' },
  headerTextLarge: { color: 'white', fontSize: 28, fontWeight: 'bold' },
  headerTextLargeYellow: { color: '#FFC107', fontSize: 28, fontWeight: 'bold', marginTop: -8 },
  headerSeparator: { height: 4, width: '100%', backgroundColor: 'white', borderRadius: 2 },
  mainContent: {
    flex: 1,
    padding: 20,
    ...Platform.select({
      web: { flexDirection: 'column', alignItems: 'center' }
    })
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
    ...Platform.select({ web: { maxWidth: 600, marginBottom: 40 } })
  },

  // Modal estilos
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#37758a',
    textAlign: 'center',
  },
  modalMessage: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 25,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  btnModal: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 8,
    borderRadius: 25,
    alignItems: 'center',
  },
  btnCancelar: {
    backgroundColor: '#ccc',
  },
  btnConfirmar: {
    backgroundColor: '#37758a',
  },
  txtBtnCancelar: {
    color: '#333',
    fontWeight: 'bold',
    fontSize: 16,
  },
  txtBtnConfirmar: {
    color: '#FFD700',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default HomeScreen;
