import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import { purple, red, orange, white, gray, blue, lightPurp, pink } from '../utils/colors'

export default function TextButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity>
      <Text style={[styles.textBtn, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textBtn: {
    backgroundColor: orange,
    color: white,
    marginTop: 18,
    padding: 18,
  }
})
