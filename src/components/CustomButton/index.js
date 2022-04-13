import React from 'react'
import {
  View,
  Platform,
  StyleSheet,
  TouchableHighlight,
  TouchableNativeFeedback,
} from 'react-native'

import { Colors } from '../../theme/colors'

const CustomButton = ({ children, style, ...props }) => {
  const isAndroid = Platform.OS == 'android'

  return isAndroid ? (
    <TouchableNativeFeedback {...props}>
      <View style={{ ...styles.touchable, ...style }}>
        {children}
      </View>
    </TouchableNativeFeedback>
  ) : (
    <TouchableHighlight style={{ ...styles.touchable, ...style }} {...props}>
      {children}
    </TouchableHighlight>
  )
}

const styles = StyleSheet.create({
  touchable: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  },
})

export default CustomButton
