import React, { Component } from 'react'
import { View, Text, TouchableOpacity, Platform, StyleSheet } from 'react-native'
import { getMetricMetaInfo,
  timeToString,
  getDailyReminderValue,
  clearLocalNotifications,
  setLocalNotificiation,
 } from '../utils/helpers'
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import TheStepper from './TheStepper'
import TheSlider from './TheSlider'
import DateHeader from './DateHeader'
import TextButton from './TextButton'
import { submitEntry, removeEntry } from '../utils/api'
import { connect } from 'react-redux' //to be able to dispatch
import { addEntry } from '../actions/' //the action creator
import { purple, red, orange, white, gray, blue, lightPurp, pink } from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function SubmitBtn ({ onPress }) {
  return (
    <TouchableOpacity
//Whenever this button is pressed, run the onPress function I passed in
      onPress={onPress}
      style={Platform.OS === 'ios' ? styles.iosSubmitButton : styles.androidSubmitButton}>
      <Text style={styles.submitButtonText}>SUBMIT</Text>
    </TouchableOpacity>
  )
}

class AddEntry extends Component {
  state = {
    run: 0,
    bike: 0,
    swim: 0,
    sleep: 0,
    eat: 0,
  }
  //Methods
  //For the steppers
  //invoke the increment function passing in a metric
  increment = (metric) => {
    //grab the max and step for the metric from the metric function
    const { max, step } = getMetricMetaInfo(metric)
    //update our local state above, passing it a function to get the current state
    this.setState((state) => {
      //count is the state of whichever metric is passed in plus the step from getMetricMetaInfo
      const count = state[metric] + step

      return {
        //grab the current state above
        ...state,
        //but, the one metric passed in is updated, if the count is bigger than
        //the max return the max number to the metric, otherwise, return the count
        [metric]: count > max ? count : count
      }
    })
  }

  decrement = (metric) => (
    //update our local state above, passing it a function to get the current state
    this.setState((state) => {
      //count is the state of whichever metric is passed in plus the step from getMetricMetaInfo
      const count = state[metric] - getMetricMetaInfo(metric).step

      return {
        //grab the current state above
        ...state,
        //but, the one metric passed in is updated, if the count is bigger than
        //the max return the max number to the metric, otherwise, return the count
        [metric]: count < 0 ? 0 : count
      }
    })
  )
  //For the sliders
  //Take in the specific metric as well as the new value
  slide = (metric, value) => {
    this.setState((state) => ({
      [metric]: value
    }))
  }

  submit = () => {
    const key = timeToString()
    const entry = this.state

    this.props.dispatch(addEntry({
      //"addEntry" accepts a new entry from the action
      [key]: entry //"entry" is just the state with the run, bike, etc. properties
    }))

    this.setState(() => ({
      run: 0,
      bike: 0,
      swim: 0,
      sleep: 0,
      eat: 0,
    }))

    this.toHome()

    submitEntry({ key, entry })

    clearLocalNotifications()
    .then(setLocalNotificiation)
  }

  reset = () => {
    const key = timeToString()
//Instead of resetting to the entry,...
    this.props.dispatch(addEntry({
//...we invoke getDailyReminderValue to get back the object telling the user to
//to log their data and reset it to what it was.
      [key]: getDailyReminderValue()
    }))

    this.toHome()

    removeEntry(key)
  }

  toHome = () => {
    this.props.navigation.dispatch(NavigationActions.back({
      //Go back to the route that has the key of AddEntry
      key: 'AddEntry'
    }))
  }

  render() {
    //store the info (properties) for the run, bike, swim, etc in a variable
    const metaInfo = getMetricMetaInfo()

    if (this.props.alreadyLogged) {
      return (
        <View style={styles.center}>
          <MaterialCommunityIcons
            name="emoticon-happy"
            size={100}
          />
          <Text>You've already logged in your data for today, great job!</Text>
          <TextButton onPress={this.reset}>
            Reset
          </TextButton>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <DateHeader date={(new Date()).toDateString()} />
        {/* <Text>{JSON.stringify(this.state)}</Text> */}
        {/*
          Returns an array which has the properties on it
          Map over the properties
          */}
        {Object.keys(metaInfo).map((key) => {
          //Get the icon, type, and everything else from the array of properties of a specific type
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {/*
                If the type of key (run.type, bike.type, etc.) is a slider, render
                a slider. If the type = steppers, render a stepper component.
                */}
              {type === 'slider'
                ? <TheSlider
                    value={value}
                    onChange={(value) => this.slide(key, value)}
                    {...rest}
                  />
                : <TheStepper
                    value={value}
                    onIncrement={() => this.increment(key)}
                    onDecrement={() => this.decrement(key)}
                    {...rest}
                  />}
              </View>
          )
        })}
        <SubmitBtn onPress={this.submit} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: white,
    flex: 1,
    padding: 18,
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  iosSubmitButton: {
    backgroundColor: purple,
    borderRadius: 2,
    height: 45,
    marginRight: 40,
    marginLeft: 40,
    padding: 12,
  },
  androidSubmitButton: {
    backgroundColor: orange,
    borderRadius: 2,
    height: 45,
    marginRight: 40,
    marginLeft: 40,
    padding: 12,
  },
  submitButtonText: {
    color: white,
    fontSize: 24,
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  }
})

//function receives the state
function mapStateToProps (state) {
  const key = timeToString()

  return {
//if state at key is not null (meaning there is data), and state at key today is undefined
//meaning the reminder isn't there because they've already logged their data,
//then this.props.alreadyLogged above is false and won't run
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}

export default connect(mapStateToProps)(AddEntry)
//export the invocation of conn ect() and pass it in the AddEntry class
//so it can dispatch to the reducer to save the entry to the redux store!
