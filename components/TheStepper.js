import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { purple, red, orange, white, gray, blue, lightPurp, pink } from '../utils/colors'

export default function TheStepper ({ max, unit, step, value, onIncrement, onDecrement }) {
  return (
    <View style={[styles.row, {justifyContent: 'space-between'}]}>
      {Platform.OS === 'android'
        ? <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.iosButton} onPress={onDecrement}>
              <MaterialCommunityIcons
                name='minus'
                color='orange'
                size={36}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iosButton} onPress={onIncrement}>
              <MaterialCommunityIcons
                name='plus'
                color='green'
                size={36}
              />
            </TouchableOpacity>
          </View>
        : <View style={{flexDirection: 'row'}}>
            <TouchableOpacity style={styles.iosButton} onPress={onDecrement}>
              <MaterialCommunityIcons
                name='minus'
                color='orange'
                size={36}
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iosButton} onPress={onIncrement}>
              <MaterialCommunityIcons
                name='plus'
                color='green'
                size={36}
              />
            </TouchableOpacity>
          </View>}
      <View style={styles.metricCounter}>
          <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
          <Text style={{fontSize: 18, color: 'gray'}}>{unit}</Text>
        </View>
      </View>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
  },
  iosButton: {
    backgroundColor: white,
    borderRadius: 2,
    borderColor: purple,
    borderWidth: 1,
    padding: 6,
    paddingLeft: 24,
    paddingRight: 24,
  },
  androidButton: {
    backgroundColor: 'purple',
    borderRadius: 2,
    margin: 5,
    padding: 18,
  },
  metricCounter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
  }
})
