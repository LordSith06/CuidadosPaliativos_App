
import React from 'react';
import {   View,   Text,   StyleSheet,   TouchableOpacity, 
  Image, 
  ScrollView 
} from 'react-native';

// Tela principal (Home) do app Cuidados Paliativos
export default function HomeScreen({ navigation }) {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.title}>O que são Cuidados Paliativos?</Text>
        <Text style={styles.subtitle}>
          Escolha uma das opções abaixo para continuar:
        </Text>
      </View>

      {/* Área dos botões */}
      <View style={styles.grid}>
        {/* Botão Diário de Sintomas */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Sintomas')}
        >
          <Image 
            source={require('../assets/img/sintomas.jpg')} 
            style={styles.icon}
          />
          <Text style={styles.cardText}>Diário de Sintomas</Text>
        </TouchableOpacity>

        {/* Botão Informações sobre o Tratamento */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Tratamento')}
        >
          <Image 
            source={require('../assets/img/informações.jpg')} 
            style={styles.icon}
          />
          <Text style={styles.cardText}>Informações sobre o Tratamento</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.grid}>
        {/* Botão Meu Prontuário */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Prontuario')}
        >
          <Image 
            source={require('../assets/img/prontuario.jpg')} 
            style={styles.icon}
          />
          <Text style={styles.cardText}>Meu Prontuário</Text>
        </TouchableOpacity>

        {/* Botão Documentos Clínicos */}
        <TouchableOpacity 
          style={styles.card}
          onPress={() => navigation.navigate('Documentos')}
        >
          <Image 
            source={require('../assets/img/documento.jpg')} 
            style={styles.icon}
          />
          <Text style={styles.cardText}>Documentos Clínicos</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#37758a',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 22,
    color: '#FFD43B',
    fontWeight: '700',
    textAlign: 'center',
  },
  subtitle: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 8,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#2b6b87',
    borderRadius: 20,
    width: 150,
    height: 170,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
  },
  icon: {
    width: 90,
    height: 90,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  cardText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 10,
    fontWeight: '500',
  },
});
