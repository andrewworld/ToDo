import Constants from '../../utils/Constants'

export function createTask (title) {
  return {
    type: Constants.action.CREATE_TASK,
    payload: title
  }
}

export function deleteTask (key) {
  return {
    type: Constants.action.DELETE_TASK,
    payload: key
  }
}

export function updateTask (key, task) {
  return {
    type: Constants.action.UPDATE_TASK,
    payload: {key, task}
  }
}

export function toggleTaskStatus (key) {
  return {
    type: Constants.action.TOGGLE_TASK_STATUS,
    payload: key
  }
}