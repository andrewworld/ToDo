export function createTask (title) {
  return {
    type: 'CREATE_TASK',
    payload: title
  }
}

export function deleteTask (index) {
  return {
    type: 'DELETE_TASK',
    payload: index
  }
}

export function updateTask (index, task) {
  return {
    type: 'UPDATE_TASK',
    payload: {index, task}
  }
}

export function toggleTaskSelection (index) {
  return {
    type: 'TOGGLE_TASK_SELECTION',
    payload: index
  }
}

export function toggleTaskStatus (index) {
  return {
    type: 'TOGGLE_TASK_STATUS',
    payload: index
  }
}

export function selectTasks () {
  return {
    type: 'SELECT_TASKS'
  }
}

export function deselectTasks () {
  return {
    type: 'DESELECT_TASKS'
  }
}

export function deleteSelectedTasks () {
  return {
    type: 'DELETE_SELECTED_TASKS'
  }
}