// App.js

import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Entypo from 'react-native-vector-icons/Entypo';
import { auth } from './database/firebase';

import Login from './components/login';
import Signup from './components/signup';

import Dashboard from './components/dashboard';
import Settings from './components/settings';
import Premium from './components/premium';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavBar = () => {
  return (
    <View style={{backgroundColor: '#23252d', flex: 1}}>
    <Tab.Navigator
      initialRouteName='Dashboard'
      screenOptions={{
        tabBarStyle: styles.tabBar,
        tabBarActiveTintColor: '#fff',
        tabBarInactiveTintColor: '#ABA5B6',
        showLabel: false,
        headerShown: false,
    }}>
      <Tab.Screen 
        name="Premium" 
        component={Premium} 
        options={
          {
            tabBarIcon: ({color}) => (
              <Entypo name="star" size={32} color={color} />
            ),
          }}
      />
      <Tab.Screen 
        name="Dashboard" 
        component={Dashboard} 
        options={
          {
            tabBarIcon: ({color}) => (
              <Entypo name="home" size={32} color={color} />
            ),
          }}
        />
      <Tab.Screen 
        name="Settings" 
        component={Settings} 
        options={
          {
            tabBarIcon: ({color}) => (
              <Entypo name="user" size={32} color={color} />
            ),
          }}
      />
    </Tab.Navigator>
    </View>
  )
}


const App = () => {
  return (
    <NavigationContainer backgroundColor ='#573D84'>
      <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false
      }}>
      <Stack.Screen 
        name="Signup" 
        component={Signup} 
        options={{ title: 'Signup'}}
      />       
      <Stack.Screen 
        name="Login" 
        component={Login} 
        options={
          {title: 'Login'}}
      />
      <Stack.Screen
        name="TabNavBar" 
        component={TabNavBar} 
        screenOptions={{headerShown: false}}
      />
    </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#2b2d35',
    borderTopColor: 'transparent',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default App;