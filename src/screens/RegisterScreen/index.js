import React from 'react'
import { Text, StyleSheet } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import { Colors } from '../../theme/colors';

const RegisterScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>
        Olá mundo, Register Screen
      </Text>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.darker,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontSize: 20
  },
})

export default RegisterScreen
