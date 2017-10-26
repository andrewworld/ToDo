import Constants from '../../utils/Constants'

const initialState = {
  keys: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.action.ADD_KEY: {
      let keys = state.keys.slice()

      keys.push(action.payload)

      return {...state, keys}
    }
    case Constants.action.REMOVE_KEY: {
      return {...state, keys: state.keys.filter(key => key !== action.payload)}
    }
    case Constants.action.CLEAR_KEYS: {
      return {...state, keys: []}
    }
    default:
      return state
  }
}