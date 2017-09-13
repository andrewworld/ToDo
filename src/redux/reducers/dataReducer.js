import { TASK_STATUS_DONE, TASK_STATUS_IN_PROGRESS } from '../../components/Tasks/index'

const initialState = {
  tasks: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case 'CREATE_TASK': {
      let tasks = state.tasks.map(item => item)
      tasks.unshift({title: action.payload, status: TASK_STATUS_IN_PROGRESS, selected: false})
      return {...state, tasks}
    }
    case 'DELETE_TASK': {
      let tasks = state.tasks.map(item => item)
      tasks.splice(1, action.payload)
      return {...state, tasks}
    }
    case 'UPDATE_TASK': {
      let tasks = state.tasks.map(item => item)
      tasks[action.payload.index] = action.payload.task
      return {...state, tasks}
    }
    case 'TOGGLE_TASK_SELECTION': {
      let tasks = state.tasks.map(item => item)
      if (tasks[action.payload].selected) tasks[action.payload] = {...tasks[action.payload], selected: false}
      else tasks[action.payload] = {...tasks[action.payload], selected: true}
      return {...state, tasks}
    }
    case 'TOGGLE_TASK_STATUS': {
      let tasks = state.tasks.map(item => item)
      switch (tasks[action.payload].status) {
        case TASK_STATUS_IN_PROGRESS:
          tasks[action.payload] = {...tasks[action.payload], status: TASK_STATUS_DONE}
          break
        case TASK_STATUS_DONE:
          tasks[action.payload] = {...tasks[action.payload], status: TASK_STATUS_IN_PROGRESS}
          break
      }
      return {...state, tasks}
    }
    case 'SELECT_TASKS': {
      return {...state, tasks: state.tasks.map(item => ({...item, selected: true}))}
    }
    case 'DESELECT_TASKS': {
      return {...state, tasks: state.tasks.map(item => ({...item, selected: false}))}
    }
    case 'DELETE_SELECTED_TASKS': {
      return {...state, tasks: state.tasks.filter(item => !item.selected)}
    }
    default:
      return state
  }
}