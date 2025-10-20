import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  FlatList, 
  ScrollView 
} from 'react-native';

// Tela: Diário de Sintomas
export default function SintomasScreen() {
  const [sintoma, setSintoma] = useState('');
  const [lista, setLista] = useState([]);

  const adicionarSintoma = () => {
    if (sintoma.trim() === '') return;
    setLista([...lista, sintoma]);
    setSintoma('');
  };

  return (
    <View style={styles.container}>
      {/* Cabeçalho */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Diário de Sintomas</Text>
      </View>

      {/* Conteúdo */}
      <ScrollView style={styles.content}>
        <Text style={styles.label}>Descreva seu sintoma:</Text>
        <TextInput
          style={styles.input}
          placeholder="Ex: Dor de cabeça, enjoo..."
          placeholderTextColor="#d9e3e8"
          value={sintoma}
          onChangeText={setSintoma}
        />

        <TouchableOpacity style={styles.btnAdd} onPress={adicionarSintoma}>
          <Text style={styles.btnText}>Adicionar</Text>
        </TouchableOpacity>

        <Text style={styles.labelLista}>Sintomas registrados:</Text>

        {lista.length === 0 ? (
          <Text style={styles.emptyText}>Nenhum sintoma registrado ainda.</Text>
        ) : (
          <FlatList
            data={lista}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Text style={styles.itemText}>• {item}</Text>
              </View>
            )}
          />
        )}
      </ScrollView>
    </View>
  );
}

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    backgroundColor: '#37758a',
    paddingVertical: 20,
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    marginBottom: 10,
  },
  headerText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  content: {
    padding: 20,
  },
  label: {
    color: '#2b6b87',
    fontSize: 16,
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#2b6b87',
    color: '#fff',
    height: 45,
    borderRadius: 25,
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  btnAdd: {
    backgroundColor: '#FFD43B',
    height: 45,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  btnText: {
    color: '#2b6b87',
    fontSize: 16,
    fontWeight: '700',
  },
  labelLista: {
    color: '#2b6b87',
    fontSize: 17,
    marginBottom: 10,
    fontWeight: '600',
  },
  item: {
    backgroundColor: '#d9e3e8',
    padding: 10,
    borderRadius: 10,
    marginBottom: 8,
  },
  itemText: {
    color: '#2b6b87',
    fontSize: 16,
  },
  emptyText: {
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});
