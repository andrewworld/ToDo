import Constants from '../../utils/Constants'
import { REHYDRATE } from 'redux-persist/constants'
import { generateId } from '../../utils/helper'

const initialState = {
  tasks: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      return {...state, ...action.payload.dataState}
    case Constants.actions.CREATE_TASK: {
      let tasks = state.tasks.map(item => item)

      tasks.unshift({
        id: generateId(),
        creationDate: new Date,
        title: action.payload,
        done: false,
        selected: false,
      })
      return {...state, tasks}
    }
    case Constants.actions.DELETE_TASK: {
      return {...state, tasks: state.tasks.filter(item => item.id !== action.payload)}
    }
    case Constants.actions.UPDATE_TASK: {
      let tasks = state.tasks.map(item => item)
      let index = tasks.findIndex(item => item.id === action.payload.id)

      tasks[index] = action.payload.task
      return {...state, tasks}
    }
    case Constants.actions.TOGGLE_TASK_SELECTION: {
      let tasks = state.tasks.map(item => item)
      let index = tasks.findIndex(item => item.id === action.payload)

      tasks[index] = {...tasks[index], selected: !tasks[index].selected}
      return {...state, tasks}
    }
    case Constants.actions.TOGGLE_TASK_STATUS: {
      let tasks = state.tasks.map(item => item)
      let index = tasks.findIndex(item => item.id === action.payload)

      tasks[index] = {...tasks[index], done: !tasks[index].done}
      return {...state, tasks}
    }
    case Constants.actions.SELECT_TASKS: {
      return {...state, tasks: state.tasks.map(item => ({...item, selected: true}))}
    }
    case Constants.actions.DESELECT_TASKS: {
      return {...state, tasks: state.tasks.map(item => ({...item, selected: false}))}
    }
    case Constants.actions.DELETE_SELECTED_TASKS: {
      return {...state, tasks: state.tasks.filter(item => !item.selected)}
    }
    default:
      return state
  }
}