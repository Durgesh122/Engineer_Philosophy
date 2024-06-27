// App.js
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screen/Login';
import Register from '../Screen/Register';
import Dashbord from '../Screen/Dashbord';

const Stack = createStackNavigator();

function Mainavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login}options={{headerShown:false}} />
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Dashbord" component={Dashbord} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Mainavigation;
