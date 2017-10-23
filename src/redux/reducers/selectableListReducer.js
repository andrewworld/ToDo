import Constants from '../../utils/Constants'

const initialState = {
  keys: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case Constants.actions.ADD_KEY: {
      let keys = state.keys.map(key => key)

      keys.push(action.payload)

      return {...state, keys}
    }
    case Constants.actions.REMOVE_KEY: {
      return {...state, keys: state.keys.filter(key => key !== action.payload)}
    }
    case Constants.actions.CLEAR_KEYS: {
      return {...state, keys: []}
    }
    default:
      return state
  }
}