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
      <StatusBar backgroundColor="#644df7"/>
       <Stack.Navigator>
         <Stack.Screen  name="Home" component={Home} options={{title: 'Home' , 
         headerStyle:{backgroundColor:'#644df7'},headerTintColor:"#fff"}}/>
         <Stack.Screen  name="List" component={List} options={{title: 'List',
        headerStyle:{backgroundColor:'#644df7'},headerTintColor:"#fff"}}/>
       </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
