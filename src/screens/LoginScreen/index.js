import React from 'react';
import { SafeAreaView, ScrollView, Text, useColorScheme } from 'react-native'

import { Colors } from '../../theme/colors';

const LoginScreen = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView >
      <ScrollView style={backgroundStyle} contentInsetAdjustmentBehavior="automatic">
        <Text>Olá mundo</Text>
      </ScrollView>
    </SafeAreaView>
  )
}

export default LoginScreen