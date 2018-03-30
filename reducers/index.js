//Import the action contstant variables
import { RECEIVE_ENTRIES, ADD_ENTRY } from '../actions'

//Create a single reducer for the store
function entries (state = {}, action) {
  switch(action.type) {
    case RECEIVE_ENTRIES :
      return {
//We want state to be exactly as it is, but also merge actions.entries
//which is an object with all the data for an entry
        ...state,
        ...action.entries,
      }
    case ADD_ENTRY :
      return {
        ...state,
        ...action.entry,
      }
    default :
      return state
  }
}

export default entries
