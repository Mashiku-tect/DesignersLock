// DesignLockApp - Main Navigation Setup
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './components/LoginScreen';
import RegisterScreen from './components/RegisterScreen';
import DashboardScreen from './components/DashboardScreen';
import NewOrderScreen from './components/NewOrderScreen';
import ForgotPasswordScreen from './components/ForgotPasswordScreen';
import DesignersScreen from './components/DesignersScreen';
import ChatScreen from './components/ChatScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="NewOrder" component={NewOrderScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
         <Stack.Screen name="DesignersScreen" component={DesignersScreen} />
           <Stack.Screen name="ChatScreen" component={ChatScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
