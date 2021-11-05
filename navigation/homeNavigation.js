import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from '../screens/home';
import Add from '../screens/add';
import Modify from '../screens/modify';

let home = createNativeStackNavigator();

let homeNavigation = () => {
  return (
    <home.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      options={{
        headerShown: false,
      }}>
      <home.Screen name="Home" component={Home} />
      <home.Screen name="Add" component={Add} />
      <home.Screen name="Modify" component={Modify} />
    </home.Navigator>
  );
};

export default homeNavigation;
