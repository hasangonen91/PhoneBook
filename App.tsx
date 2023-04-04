import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import StackScreen from './src/Navigation/StackScreen';



const App = () => {
  return (
    <NavigationContainer>
      <StackScreen />
    </NavigationContainer>
      
    
  )
}

export default App

const styles = StyleSheet.create({})