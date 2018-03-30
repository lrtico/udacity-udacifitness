//All of the actions that update my redux store
//Think about teh app, there are 2 types of actions that update the redux store
//1. Enter in a new entry for a day
//2. Whenever we go fetch entries from our database and get them back

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES'
export const ADD_ENTRY = 'ADD_ENTRY'

//create my action creators
//First, the one that gets all the entries
export function receiveEntries (entries) {
   return {
     type: RECEIVE_ENTRIES,
     entries //this means it passes along the entries it fetched
   }
}

//Second we create an action creator that adds a new entry
export function addEntry (entry) {
  return {
    type: ADD_ENTRY,
    entry //this means it passes along the entry
  }
}
