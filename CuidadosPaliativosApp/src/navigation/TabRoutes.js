import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Feather';


import HomeStack from './HomeStack';
import FaqScreen from '../pages/FaqScreen';
import ContactScreen from '../pages/ContactScreen';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 70,
          paddingBottom: 10,
          backgroundColor: '#fff',
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          //position: 'absolute',
         //overflow: 'hidden',
        },
        tabBarActiveTintColor: '#2b6b87',
        tabBarInactiveTintColor: '#A0A0A0',
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="home" size={size} color={color} />
          ),
          tabBarLabel: 'HOME',
        }}
      />
      <Tab.Screen
        name="Faq"
        component={FaqScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="help-circle" size={size} color={color} />
          ),
          tabBarLabel: 'FAQ',
        }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon name="phone" size={size} color={color} />
          ),
          tabBarLabel: 'CONTATO',
        }}
      />
    </Tab.Navigator>
  );
}
