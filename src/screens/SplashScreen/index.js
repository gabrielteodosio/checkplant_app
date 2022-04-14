import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { View, StyleSheet } from 'react-native'

const SplashScreen = ({ navigation, auth }) => {
  useEffect(() => {
    const { token } = auth

    if (token) {
      navigation.replace('MapStack')
    } else {
      navigation.replace('Login')
    }
  }, [])

  return (
    <View style={styles.container} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
})

const mapStateToProps = ({ auth }) => ({ auth });

export default connect(mapStateToProps)(SplashScreen)
