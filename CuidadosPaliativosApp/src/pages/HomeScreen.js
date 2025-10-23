import React from 'react';
import { SafeAreaView, View, Text, StatusBar, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MenuButton from '../components/MenuButton';

// Import das imagens
import prontuario from '../assets/img/prontuario.jpg';
import documento from '../assets/img/documento.jpg';
import sintomas from '../assets/img/sintomas.jpg';
import informacoes from '../assets/img/informações.jpg';


const HomeScreen = () => {
  return (
    <SafeAreaView style={Estilo.safeArea}>
      {/*Define cor da barra de status*/}
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />

      <View style={Estilo.container}>
          {/*Cabeçalho*/}
        <View style={Estilo.header}>
          <View style={Estilo.headerTitleContainer}>
            <Icon name="heartbeat" size={30} color="#FFD700" style={Estilo.headerIcon}/>
            <View>
              <Text style={Estilo.headerTextSmall}>O QUE SÃO</Text>
              <Text style={Estilo.headerTextLarge}>Cuidados</Text>
              <Text style={Estilo.headerTextLargeYellow}>Paliativos?</Text>
            </View>
          </View>
          <View style={Estilo.headerSeparator} />
        </View>

        {/*Conteúdo principal*/}
        <View style={Estilo.mainContent}>
          <View style={Estilo.menuRow}>
            <MenuButton text="DIÁRIO DE SINTOMAS" image={sintomas} screen="Sintomas" />
            <MenuButton text="INFORMAÇÕES SOBRE O TRATAMENTO" image={informacoes} screen="Tratamento" />
          </View>
          <View style={Estilo.menuRow}>
            <MenuButton text="MEU PRONTUÁRIO" image={prontuario} screen="Prontuario" />
            <MenuButton text="DOCUMENTOS CLÍNICOS" image={documento} screen="Documentos" />
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
};


const Estilo = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#37758a',
  },
  container: {
    flex: 1,
    backgroundColor: '#37758a',
  },
  header: {
    padding: 20,
    paddingTop: 30,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerIcon: {
    marginRight: 15,
  },
  headerTextSmall: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
  },
  headerTextLarge: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
  },
  headerTextLargeYellow: {
    color: '#FFC107',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -8, 
  },
  headerSeparator: {
    height: 4,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  mainContent: {
    flex: 1,
    padding: 20,
    ...Platform.select({
      web: {
        flexDirection: 'column',
        alignItems: 'center',
      },
    }),
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    width: '100%',
    ...Platform.select({
      web: {
        maxWidth: 600, 
        marginBottom: 40,
      },
    }),
  },
});

export default HomeScreen;
