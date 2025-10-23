import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//Componente de botão usado no menu principal
const MenuButton = ({ text, image, screen }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={Estilo.menuButton}
      onPress={() => navigation.navigate(screen)} 
    >
      <Image
        source={image}
        style={{ width: 80, height: 80, marginBottom: 12 }}
      />
      <Text
        style={Estilo.menuButtonText}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const Estilo = StyleSheet.create({
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
  menuButtonText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#555',
    textAlign: 'center',
    marginTop: 5,
  },
});

export default MenuButton;
