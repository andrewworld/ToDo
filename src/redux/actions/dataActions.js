import Constants from '../../utils/Constants'

export function createTask (title) {
  return {
    type: Constants.actions.CREATE_TASK,
    payload: title
  }
}

export function deleteTask (id) {
  return {
    type: Constants.actions.DELETE_TASK,
    payload: id
  }
}

export function updateTask (id, task) {
  return {
    type: Constants.actions.UPDATE_TASK,
    payload: {id, task}
  }
}

export function toggleTaskSelection (id) {
  return {
    type: Constants.actions.TOGGLE_TASK_SELECTION,
    payload: id
  }
}

export function toggleTaskStatus (id) {
  return {
    type: Constants.actions.TOGGLE_TASK_STATUS,
    payload: id
  }
}

export function selectTasks () {
  return {
    type: Constants.actions.SELECT_TASKS
  }
}

export function deselectTasks () {
  return {
    type: Constants.actions.DESELECT_TASKS
  }
}

export function deleteSelectedTasks () {
  return {
    type: Constants.actions.DELETE_SELECTED_TASKS
  }
}