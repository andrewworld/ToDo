import Constants from '../../utils/Constants'
import { REHYDRATE } from 'redux-persist//lib/constants'
import { generateId } from '../../utils/helper'

const initialState = {
  tasks: []
}

export default function (state = initialState, action) {
  switch (action.type) {
    case REHYDRATE:
      return {...state, ...action.payload.dataState}
    case Constants.action.CREATE_TASK: {
      let tasks = state.tasks.slice()

      tasks.unshift({
        key: generateId(),
        title: action.payload,
        done: false,
      })
      return {...state, tasks}
    }
    case Constants.action.DELETE_TASK: {
      return {...state, tasks: state.tasks.filter(item => item.key !== action.payload)}
    }
    case Constants.action.UPDATE_TASK: {
      let tasks = state.tasks.slice()
      let index = tasks.findIndex(item => item.key === action.payload.key)

      tasks[index] = action.payload.task
      return {...state, tasks}
    }
    case Constants.action.TOGGLE_TASK_STATUS: {
      let tasks = state.tasks.slice()
      let index = tasks.findIndex(item => item.key === action.payload)

      tasks[index] = {...tasks[index], done: !tasks[index].done}
      return {...state, tasks}
    }
    default:
      return state
  }
}