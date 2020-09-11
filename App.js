/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import 'react-native-gesture-handler';

import Home from './app/Screens/Home';
import List from './app/Screens/List';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
       <Stack.Navigator>
         <Stack.Screen  name="Home" component={Home} options={{title: 'Home'}}/>
         <Stack.Screen  name="List" component={List} options={{title: 'List'}}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
