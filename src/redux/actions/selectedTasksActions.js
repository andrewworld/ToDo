import Constants from '../../utils/Constants'

export function addKey (key) {
  return {
    type: Constants.action.ADD_KEY,
    payload: key
  }
}

export function removeKey (key) {
  return {
    type: Constants.action.REMOVE_KEY,
    payload: key
  }
}

export function clearKeys () {
  return {
    type: Constants.action.CLEAR_KEYS
  }
}
