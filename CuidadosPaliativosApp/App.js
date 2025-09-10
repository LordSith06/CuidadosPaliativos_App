import React from 'react';  
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { Image } from 'react-native';
import logo from './src/assets/img/logo.jpg';


const MenuButton = ({iconName, iconLibrary, text}) => {
  const IconComponent = iconLibrary === 'Material' ? MaterialCommunityIcons : Icon;
  return (
    <TouchableOpacity style={styles.menuButton}>
      
        <Image source={logo} style={{ width: 100, height: 100, marginBottom: 10 }} />
     
      <Text style={styles.menuButtonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const App = () => {
  return (
    <SafeAreaView style={Estilo.safeArea}>
      <View style={Estilo.container}>
                
        {/* Cabeçalho */}
        <View style={Estilo.header}>
         <View style={Estilo.headerTitleContainer}>
            <Icon name="heartbeat" size={50} color="#FFD700" style={Estilo.headerIcon}/>
            <View>
              <Text style={Estilo.headerTextSmall}>O QUE SÃO</Text>
              <Text style={Estilo.headerTextLarge}>Cuidados</Text>
              <Text style={Estilo.headerTextLargeYellow}>Paliativos?</Text>
            </View>
          </View>
          <View style={Estilo.LinhaBranca} />
        </View>


        <View style={styles.mainContent}>
          <View style={styles.menuRow}>
            <MenuButton iconName="thermometer-half" text="DIÁRIO DE SINTOMAS" />
            <MenuButton iconName="information-outline" iconLibrary="Material" text="INFORMAÇÕES SOBRE O TRATAMENTO" />
          </View>
          <View style={styles.menuRow}>
            <MenuButton iconName="clipboard-list" text="MEU PRONTUÁRIO" />
            <MenuButton iconName="file-document-edit-outline" iconLibrary="Material" text="DOCUMENTOS CLÍNICOS" />
          </View>
        </View>


        {/* Barra de navegação inferior */}
        <View style={Estilo.navBar}>
          <TouchableOpacity style={[Estilo.navButton, Estilo.navButtonActive]}>
            <Icon name="home" size={24} color="#4A90E2" /> 
            <Text style={Estilo.navTextActive}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={Estilo.navButton}>
            <Icon name="question-circle" size={28} color="#A0A0A0" />
          </TouchableOpacity>
          <TouchableOpacity style={Estilo.navButton}>
            <Icon name="clinic-medical" size={28} color="#A0A0A0" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
};

const Estilo = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4180AB',
  },
  container: {
    flex: 1,
    backgroundColor: '#4180AB',
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
    marginRight: 20
  },
  headerTextSmall: {
    color: 'white',
    fontSize: 16,
    fontWeight: '300',
    marginBottom: 5,
  },
  headerTextLarge: {
    color: '#FFD700',
    fontSize: 28,
    fontWeight: 'bold',

  },
  headerTextLargeYellow: {
    color: 'white',
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: -5, 
 
  },
  LinhaBranca: {
    height: 4,
    width: 'auto',
    backgroundColor: 'white',
    borderRadius: 2,
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center', // Centraliza no meio da tela
    padding: 20,
  },
  menuRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  menuButton: {
    width: '45%',
    aspectRatio: 1, 
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  iconContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: 5,

  },
  navBar: {
    flexDirection: 'row',
    height: 70,
    backgroundColor: '#F0F0F0',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    elevation: 10,
  },
  navButton: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  navButtonActive: {
    backgroundColor: '#D6EAF8',
    borderRadius: 15,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  navTextActive: {
    fontSize: 12,
    color: '#4A90E2',
    fontWeight: 'bold',
  },
});

export default App;