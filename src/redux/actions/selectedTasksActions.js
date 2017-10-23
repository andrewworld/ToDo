import Constants from '../../utils/Constants'

export function addKey (key) {
  return {
    type: Constants.actions.ADD_KEY,
    payload: key
  }
}

export function removeKey (key) {
  return {
    type: Constants.actions.REMOVE_KEY,
    payload: key
  }
}

export function clearKeys () {
  return {
    type: Constants.actions.CLEAR_KEYS
  }
}
