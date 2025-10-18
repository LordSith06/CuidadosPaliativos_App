
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabRoutes from './TabRoutes';
import LoginScreen from '../pages/LoginScreen';
import SintomasScreen from '../pages/SintomasScreen';
import TratamentoScreen from '../pages/TratamentoScreen';
import ProntuarioScreen from '../pages/ProntuarioScreen';
import DocumentosScreen from '../pages/DocumentosScreen';

// Criando a pilha de navegação
const Stack = createNativeStackNavigator();

export default function StackRoutes() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      {/* Tela inicial */}
      <Stack.Screen name="Login" component={LoginScreen} />

      {/* Navegação principal em abas */}
      <Stack.Screen name="MainTabs" component={TabRoutes} />

      {/* Telas acessadas a partir dos botões da Home */}
      <Stack.Screen name="Sintomas" component={SintomasScreen} />
      <Stack.Screen name="Tratamento" component={TratamentoScreen} />
      <Stack.Screen name="Prontuario" component={ProntuarioScreen} />
      <Stack.Screen name="Documentos" component={DocumentosScreen} />
    </Stack.Navigator>
  );
}
