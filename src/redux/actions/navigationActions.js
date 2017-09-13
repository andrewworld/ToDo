import { NavigationActions } from 'react-navigation'
import { NEW_TASK } from '../../navigators/AppNavigator'

export function goBack () {
  return NavigationActions.back()
}

export function openNewTask (params) {
  return NavigationActions.navigate({
    routeName: NEW_TASK,
    params
  })
}