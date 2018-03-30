//A stateless functional component example
import React from 'react'
import { Text } from 'react-native'
import { purple } from '../utils/colors'

export default function DateHeader ({ date }) {
  return (
    <Text style={{ color: purple, fontSize: 24, }}>
      {date}
    </Text>
  )
}
