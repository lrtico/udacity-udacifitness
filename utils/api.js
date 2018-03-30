import { AsyncStorage } from 'react-native'
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar'

//Get all the results from our fake calendar database
export function fetchCalendarResults () {
  //Get all the items in the CALENDAR_STORAGE_KEY property
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
    .then(formatCalendarResults) //Which returns the data formatted
}

export function submitEntry ({ entry, key }) {
//add an entry for the day to the local database on the phone
  return AsyncStorage.mergeItem(CALENDAR_STORAGE_KEY, JSON.stringify({
//pass in an object with the key as the property name and the entry as the value
    [key]: entry,
  }))
}

export function removeEntry (key) {
//first we get everything at the CALENDAR_STORAGE_KEY location
  return AsyncStorage.getItem(CALENDAR_STORAGE_KEY)
  .then((results) => {
    const data = JSON.parse(results)
    data[key] = undefined
//Delete whatever is at the key property of all the results
    delete data[key]
//Then use AsyncStorage setItem to be all our data whatever is at the key after
//we stringify it
    AsyncStorage.setItem(CALENDAR_STORAGE_KEY, JSON.stringify(data))
  })
}
