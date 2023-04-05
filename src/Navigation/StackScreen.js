import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../LoginScreen/LoginScreen'
import PhoneBookScreen from '../PhoneBookScreen/PhoneBookScreen'
import SplashScreen from '../SplashScreen/SplashScreen';
import RegisterScreen from '../RegisterScreen/RegisterScreen';


const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName="SplashScreen"

    >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
        <Stack.Screen name="PhoneBookScreen" component={PhoneBookScreen}
            options={{
                headerShown: true,
                headerTitle: "Phone Book",
                headerTitleStyle: {
                    color: "#0074D9",
                    fontSize: 20,
                    fontWeight: "bold",
                },
                headerStyle: {
                    backgroundColor: "#fff",
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerTintColor: "#0074D9",
            }}
         />
        
    </Stack.Navigator>

  )
}

export default StackScreen

const styles = StyleSheet.create({})