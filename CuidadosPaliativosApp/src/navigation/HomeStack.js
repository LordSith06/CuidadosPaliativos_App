import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import HomeScreen from '../pages/HomeScreen';
import SintomasScreen from '../pages/SintomasScreen';
import TratamentoScreen from '../pages/TratamentoScreen';
import ProntuarioScreen from '../pages/ProntuarioScreen';
import DocumentosScreen from '../pages/DocumentosScreen';
import AtendimentosScreen from '../pages/AtendimentosScreen'; // <-- ADICIONADO

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator>

      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Sintomas"
        component={SintomasScreen}
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: '#37758a' },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Prontuario"
        component={ProntuarioScreen}
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: '#37758a' },
          headerTintColor: '#fff',
        }}
      />

      {/* NOVA TELA DE ATENDIMENTOS */}
      <Stack.Screen
        name="Atendimentos"
        component={AtendimentosScreen}
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: '#37758a' },
          headerTintColor: '#fff',
        }}
      />

      <Stack.Screen
        name="Documentos"
        component={DocumentosScreen}
        options={{
          headerTitle: '',
          headerStyle: { backgroundColor: '#37758a' },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}
