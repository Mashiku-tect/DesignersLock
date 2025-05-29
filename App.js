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
import ProductScreen from './components/ProductScreen';
import { LogBox } from 'react-native';
import ProfileScreen from './components/ProfileScreen';

LogBox.ignoreLogs([
  'Text strings must be rendered within a <Text> component'
]);


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
           <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
           <Stack.Screen name="ChatScreen" component={ChatScreen} />
            <Stack.Screen 
        name="Product" 
        component={ProductScreen} 
        options={{ 
          title: 'Product Details',
          headerBackTitleVisible: false,
          headerTintColor: '#4a6bff',
        }} 
      />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
