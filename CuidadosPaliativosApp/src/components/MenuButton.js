import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';

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

const styles = StyleSheet.create({
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
