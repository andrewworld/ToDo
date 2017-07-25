import React from 'react'
import { AsyncStorage } from 'react-native'

export async function setTasks (tasks) {
  try {
    await AsyncStorage.setItem('tasks', JSON.stringify(tasks))
  } catch (error) {

  }
}

export async function getTasks () {
  try {
    let tasksJSON = await AsyncStorage.getItem('tasks')
    return JSON.parse(tasksJSON)
  } catch (error) {

  }
}