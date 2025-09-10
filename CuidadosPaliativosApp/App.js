import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Image } from 'react-native';
import prontuario from './src/assets/img/prontuario.jpg';
import documento from './src/assets/img/documento.jpg';
import sintomas from './src/assets/img/sintomas.jpg';
import informacoes from './src/assets/img/informações.jpg';


const MenuButton = ({ text, image }) => {
  return (
    <TouchableOpacity style={styles.menuButton}>
      <Image
        source={image} 
        style={{ width: 80, height: 80, marginBottom: 12 }}
      />
      <Text
        style={styles.menuButtonText}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};


const App = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#4A90E2" />
      <View style={styles.container}>
        {/* Cabeçalho */}
        <View style={styles.header}>
          <View style={styles.headerTitleContainer}>
            <Icon name="heartbeat" size={30} color="#FFD700" style={styles.headerIcon}/>
            <View>
              <Text style={styles.headerTextSmall}>O QUE SÃO</Text>
              <Text style={styles.headerTextLarge}>Cuidados</Text>
              <Text style={styles.headerTextLargeYellow}>Paliativos?</Text>
            </View>
          </View>
          <View style={styles.headerSeparator} />
        </View>


        <View style={styles.mainContent}>
          <View style={styles.menuRow}>
            <MenuButton iconName="thermometer-half" text="DIÁRIO DE SINTOMAS" image = {sintomas} />
            <MenuButton iconName="information-outline" iconLibrary="Material" text="INFORMAÇÕES SOBRE O TRATAMENTO" image = {informacoes}/>
          </View>
          <View style={styles.menuRow}>
            <MenuButton iconName="clipboard-list" text="MEU PRONTUÁRIO" image = {prontuario} />
            <MenuButton iconName="file-document-edit-outline" iconLibrary="Material" text="DOCUMENTOS CLÍNICOS" image = {documento} />
          </View>
        </View>


        <View style={styles.navBar}>
          <TouchableOpacity style={[styles.navButton, styles.navButtonActive]}>
            <Icon name="home" size={24} color="#4A90E2" /> 
            <Text style={styles.navTextActive}>HOME</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Icon name="question-circle" size={28} color="#A0A0A0" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navButton}>
            <Icon name="clinic-medical" size={28} color="#A0A0A0" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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