
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../pages/HomeScreen';
import FaqScreen from '../pages/FaqScreen';
import ContactScreen from '../pages/ContactScreen';
import Icon from 'react-native-vector-icons/Feather';

// Criando a navegação por abas
const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 70, paddingBottom: 10 },
        tabBarActiveTintColor: '#2b6b87',
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="home" size={size} color={color} />,
          tabBarLabel: 'HOME',
        }}
      />
      <Tab.Screen
        name="Faq"
        component={FaqScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="help-circle" size={size} color={color} />,
          tabBarLabel: 'FAQ',
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarIcon: ({ color, size }) => <Icon name="phone" size={size} color={color} />,
          tabBarLabel: 'CONTATO',
        }}
      />
    </Tab.Navigator>
  );
}
