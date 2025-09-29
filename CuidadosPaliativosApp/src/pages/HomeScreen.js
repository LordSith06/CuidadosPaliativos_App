import React from 'react';
import { SafeAreaView, View, Text, StatusBar, StyleSheet, Platform } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MenuButton from '../components/MenuButton';
import prontuario from '../assets/img/prontuario.jpg';
import documento from '../assets/img/documento.jpg';
import sintomas from '../assets/img/sintomas.jpg';
import informacoes from '../assets/img/informações.jpg';

const HomeScreen = () => {
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
            <MenuButton text="DIÁRIO DE SINTOMAS" image={sintomas} />
            <MenuButton text="INFORMAÇÕES SOBRE O TRATAMENTO" image={informacoes} />
          </View>
          <View style={styles.menuRow}>
            <MenuButton text="MEU PRONTUÁRIO" image={prontuario} />
            <MenuButton text="DOCUMENTOS CLÍNICOS" image={documento} />
          </View>
        </View>

        <View style={styles.navBar}>
          <View style={[styles.navButton, styles.navButtonActive]}>
            <Icon name="home" size={24} color="#4A90E2" />
            <Text style={styles.navTextActive}>HOME</Text>
          </View>
          <View style={styles.navButton}>
            <Icon name="question-circle" size={28} color="#A0A0A0" />
          </View>
          <View style={styles.navButton}>
            <Icon name="clinic-medical" size={28} color="#A0A0A0" />
          </View>
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

export default HomeScreen;
