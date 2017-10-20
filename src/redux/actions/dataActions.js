import Constants from '../../utils/Constants'

export function createTask (title) {
  return {
    type: Constants.actions.CREATE_TASK,
    payload: title
  }
}

export function deleteTask (key) {
  return {
    type: Constants.actions.DELETE_TASK,
    payload: key
  }
}

export function updateTask (key, task) {
  return {
    type: Constants.actions.UPDATE_TASK,
    payload: {key, task}
  }
}

export function toggleTaskStatus (key) {
  return {
    type: Constants.actions.TOGGLE_TASK_STATUS,
    payload: key
  }
}