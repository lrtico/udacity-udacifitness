import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { white } from '../utils/colors'
import MetricCard from './MetricCard'
import { removeEntry } from '../utils/api'
import { addEntry } from '../actions'
import { timeToString, getDailyReminderValue } from '../utils/helpers'
import TextButton from './TextButton'

class EntryDetail extends Component {
  static navigationOptions = ({ navigation }) => {
    const { entryId } = navigation.state.params

    const year = entryId.slice(0,4)
    const month = entryId.slice(5,7)
    const day = entryId.slice(8)

    return {
      title: `${month}/${day}/${year}`
    }
  }

  reset = () => {
    const { remove, goBack, removeEntry } = this.props
    remove()
    goBack()
    removeEntry(entryId)
  }

  shouldComponentUpdate (nextProps) {
    //don't re-render unless the day has no current info in it and it isn't today
    return nextProps.metrics !== null && !nextProps.metrics.today
  }

  render() {
    //Grab the metrics from the redux store call
    const { metrics } = this.props

    return(
      <View style={styles.container}>
        <MetricCard metrics={metrics} />
        <TextButton onPress={this.reset} style={{margin: 18}}>
          RESET
        </TextButton>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: white,
    padding: 12,
  },
})

//Passes data to our EntryDetail component from the redux store
function mapStateToProps (state, { navigation }) {
  const { entryId } = navigation.state.params

  return {
    entryId,
    metrics: state[entryId]
  }
}

//Sends data to the redux createStore
function mapDispatchToProps (dispatch, { navigation }) {
  return {
    remove: () => dispatch(addEntry({
      //If the current day we are resetting is today, show the message, or null
      [entryId]: timeToString() === entryId
      ? getDailyReminderValue()
      : null
    })),
    goBack: () => navigation.goBack(),
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EntryDetail)
