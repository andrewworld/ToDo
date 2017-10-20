import { BackHandler } from 'react-native'
import { NavigationActions } from 'react-navigation'
import { NEW_TASK } from '../../navigators/AppNavigator/index'

export function goBack () {
  return async (dispatch, getState) => {
    const state = getState().navigationState
    if (state.index) {
      dispatch(NavigationActions.back())
    } else {
      BackHandler.exitApp()
    }
  }
}

export function openNewTask (params) {
  return NavigationActions.navigate({
    routeName: NEW_TASK,
    params
  })
}