
import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';


export default function ContactScreen() {
  return (
    <View style={Estilo.container}>
      {/* Cabeçalho */}
      <View style={Estilo.header}>
        <Text style={Estilo.headerText}>Contato</Text>
      </View>

      {/* Corpo */}
      <View style={Estilo.body}>
        <Text style={Estilo.info}>
          Se você precisa de ajuda ou deseja mais informações sobre cuidados paliativos, entre em contato conosco:
        </Text>

        <Text style={Estilo.label}>📞 Telefone:</Text>
        <Text style={Estilo.text}> (11) 4002-8922 </Text>

        <Text style={Estilo.label}>📧 E-mail:</Text>
        <TouchableOpacity onPress={() => Linking.openURL('mailto:contato@cuidadospaliativos.com')}>
          <Text style={[Estilo.text, Estilo.link]}>contato@cuidadospaliativos.com</Text>
        </TouchableOpacity>

        <Text style={Estilo.label}>🌐 Site:</Text>
        <TouchableOpacity onPress={() => Linking.openURL('')}>
          <Text style={[Estilo.text, Estilo.link]}>www.cuidadospaliativosficticio.com</Text>
        </TouchableOpacity>

        <Text style={Estilo.footer}>
          Estamos aqui para apoiar você e sua família. 💙
        </Text>
      </View>
    </View>
  );
}


const Estilo = StyleSheet.create({
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
  },
  headerText: {
    color: '#ffffff',
    fontSize: 22,
    fontWeight: '700',
  },
  body: {
    flex: 1,
    padding: 25,
    alignItems: 'center',
  },
  info: {
    color: '#333333',
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
  label: {
    color: '#2b6b87',
    fontSize: 17,
    fontWeight: '600',
    marginTop: 10,
  },
  text: {
    color: '#333333',
    fontSize: 16,
    marginBottom: 10,
  },
  link: {
    color: '#2b6b87',
    textDecorationLine: 'underline',
  },
  footer: {
    marginTop: 40,
    fontSize: 15,
    color: '#2b6b87',
    textAlign: 'center',
  },
});
