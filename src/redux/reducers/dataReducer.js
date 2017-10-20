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
        key: generateId(),
        creationDate: new Date,
        title: action.payload,
        done: false,
      })
      return {...state, tasks}
    }
    case Constants.actions.DELETE_TASK: {
      return {...state, tasks: state.tasks.filter(item => item.key !== action.payload)}
    }
    case Constants.actions.UPDATE_TASK: {
      let tasks = state.tasks.map(item => item)
      let index = tasks.findIndex(item => item.key === action.payload.key)

      tasks[index] = action.payload.task
      return {...state, tasks}
    }
    case Constants.actions.TOGGLE_TASK_STATUS: {
      let tasks = state.tasks.map(item => item)
      let index = tasks.findIndex(item => item.key === action.payload)

      tasks[index] = {...tasks[index], done: !tasks[index].done}
      return {...state, tasks}
    }
    default:
      return state
  }
}