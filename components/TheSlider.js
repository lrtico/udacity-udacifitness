import React from 'react'
import { View, Text, Slider, StyleSheet } from 'react-native'
import { gray } from '../utils/colors'

export default function TheSlider ({ max, step, unit, value, onChange }) {
  return (
    <View style={styles.row}>
      <Slider
        //Whenever you want a component to take up the full width of its parent
        style={{flex: 1}}
        step={step}
        value={value}
        maximumValue={max}
        minimumValue={0}
        onValueChange={onChange}
      />
      <View style={styles.metricCounter}>
        <Text style={{fontSize: 24, textAlign: 'center'}}>{value}</Text>
        <Text style={{fontSize: 18, color: gray}}>{unit}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },
  metricCounter: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 85,
  },
})
