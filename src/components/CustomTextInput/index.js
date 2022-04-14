import React, { forwardRef } from 'react'
import { View, TextInput, Text, StyleSheet } from 'react-native'

import { Colors } from '../../theme/colors'

const CustomTextInput = forwardRef(
  (props, ref) => {
    const { label, labelStyle, inputStyle, error, ...inputProps } = props
    return (
      <View style={styles.container}>
        {label && <Text style={[styles.label, labelStyle]}>{label}</Text>}
        <TextInput
          autoCapitalize="none"
          ref={ref}
          style={[
            styles.inputContainer,
            { borderColor: error ? '#fc6d47' : '#c0cbd3' },
            inputStyle,
          ]}
          {...inputProps}
        />
        <Text style={styles.textError}>{error && error.message}</Text>
      </View>
    )
  }
)

const styles = StyleSheet.create({
  container: {},
  label: {},
  inputContainer: {
    minWidth: '80%',
    color: Colors.dark,
    paddingHorizontal: 10,
    backgroundColor: Colors.light,
    marginBottom: 10,
    borderRadius: 5,
  },
  textError: {}
})

export default CustomTextInput
