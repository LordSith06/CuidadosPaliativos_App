import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../pages/HomeScreen';
import SintomasScreen from '../pages/SintomasScreen';
import TratamentoScreen from '../pages/AtendimentoScreen';
import ProntuarioScreen from '../pages/ProntuarioScreen';
import DocumentosScreen from '../pages/DocumentosScreen';
import AtendimentoScreen from '../pages/AtendimentoScreen';
import AvaliacaoScreen from '../pages/AvaliacaoScreen';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>
      {/* Tela principal */}
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerShown: false, 
        }}
      />

      {/* Diário de Sintomas */}
      <Stack.Screen
        name="Sintomas"
        component={SintomasScreen}
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: '#37758a' },
          headerTintColor: '#fff', 
        }}
      />

      {/* Informações sobre o Tratamento */}
      <Stack.Screen
        name="Atendimentos"
        component={AtendimentoScreen}
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: '#37758a' },
          headerTintColor: '#fff',
        }}
      />

      {/* Meu Prontuário */}
      <Stack.Screen
        name="Prontuario"
        component={ProntuarioScreen}
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: '#37758a' },
          headerTintColor: '#fff',
        }}
      />

      {/* Documentos Clínicos */}
      <Stack.Screen
        name="Documentos"
        component={DocumentosScreen}
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: '#37758a' },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Avaliacao"
        component={AvaliacaoScreen}
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: '#37758a' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
