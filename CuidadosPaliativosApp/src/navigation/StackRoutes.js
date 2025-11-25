import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from './TabRoutes';
import LoginScreen from '../pages/LoginScreen';
import SintomasScreen from '../pages/SintomasScreen';
import AtendimentoScreen from '../pages/AtendimentoScreen';
import ProntuarioScreen from '../pages/ProntuarioScreen';
import DocumentosScreen from '../pages/DocumentosScreen';
import CriarContaScreen from '../pages/CriarContaScreen'; // Importar a nova tela
import AvaliacaoScreen from '../pages/AvaliacaoScreen';

const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      {/* Tela inicial */}
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* Tela de Criar Conta */}
      <Stack.Screen name="CriarConta" component={CriarContaScreen} />

      {/* Navegação principal em abas */}
      <Stack.Screen name="MainTabs" component={TabRoutes} />

      {/* Telas acessadas a partir dos botões da Home */}
      <Stack.Screen name="Sintomas" component={SintomasScreen} />
      <Stack.Screen name="Atendimentos" component={AtendimentoScreen} />
      <Stack.Screen name="Prontuario" component={ProntuarioScreen} />
      <Stack.Screen name="Documentos" component={DocumentosScreen} />
      <Stack.Screen name="Avaliacao" component={AvaliacaoScreen} />
    </Stack.Navigator>
  );
}
