import React, { useEffect, useState } from 'react';
import { 
  View, Text, StyleSheet, FlatList, TouchableOpacity, Alert 
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome5';

const AtendimentosScreen = ({ navigation }) => {
  const [atendimentos, setAtendimentos] = useState([]);

  const carregarAtendimentos = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      const resposta = await fetch("http://10.0.1.20:3000/atendimentos", {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = await resposta.json();
      setAtendimentos(data);
    } catch (err) {
      console.log("Erro ao carregar atendimentos", err);
    }
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', carregarAtendimentos);
    return unsubscribe;
  }, [navigation]);

  const excluirAtendimento = (id) => {
    Alert.alert(
      "Excluir atendimento",
      "Tem certeza que deseja excluir este atendimento?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            const token = await AsyncStorage.getItem('token');
            await fetch(`http://10.0.1.20:3000/deletaratendimento/${id}`, {
              method: 'DELETE',
              headers: { Authorization: `Bearer ${token}` }
            });
            carregarAtendimentos();
          }
        }
      ]
    );
  };

  return (
    <View style={s.container}>
      
      {/* Título */}
      <Text style={s.titulo}>Meus Atendimentos</Text>

      {/* Botão adicionar */}
      <TouchableOpacity 
        style={s.btnAdd} 
        onPress={() => navigation.navigate('NovoAtendimento')}
      >
        <Icon name="plus" size={18} color="#FFD700" />
        <Text style={s.btnAddText}>Adicionar Atendimento</Text>
      </TouchableOpacity>

      {/* Lista */}
      <FlatList
        data={atendimentos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={s.card}>
            <Text style={s.cardTitle}>📅 {item.data}</Text>
            <Text style={s.cardText}>👨‍⚕️ Médico: {item.medico}</Text>
            <Text style={s.cardText}>📝 {item.descricao}</Text>

            <View style={s.cardButtons}>
              <TouchableOpacity 
                style={s.btnEditar}
                onPress={() => navigation.navigate("EditarAtendimento", { atendimento: item })}
              >
                <Icon name="edit" size={16} color="white" />
              </TouchableOpacity>

              <TouchableOpacity 
                style={s.btnExcluir}
                onPress={() => excluirAtendimento(item.id)}
              >
                <Icon name="trash" size={16} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#37758a", padding: 20 },
  titulo: { 
    fontSize: 26, 
    fontWeight: "bold", 
    color: "white", 
    marginBottom: 20, 
    textAlign: "center" 
  },

  btnAdd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#37758a",
    borderWidth: 2,
    borderColor: "#FFD700",
    padding: 12,
    borderRadius: 25,
    marginBottom: 25
  },
  btnAddText: {
    color: "#FFD700",
    fontSize: 16,
    marginLeft: 8,
    fontWeight: "bold"
  },

  card: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    marginBottom: 15
  },
  cardTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 5, color: "#37758a" },
  cardText: { fontSize: 15, color: "#333" },

  cardButtons: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10
  },
  btnEditar: {
    backgroundColor: "#4CAF50",
    padding: 8,
    borderRadius: 8,
    marginRight: 10
  },
  btnExcluir: {
    backgroundColor: "#E53935",
    padding: 8,
    borderRadius: 8
  }
});

export default AtendimentosScreen;
