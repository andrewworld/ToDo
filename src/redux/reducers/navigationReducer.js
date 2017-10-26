import { NavigationActions } from 'react-navigation'
import AppNavigator, { TASKS } from '../../navigators/AppNavigator'

const initialState = AppNavigator.router.getStateForAction(NavigationActions.navigate({routeName: TASKS}))

export default function navigationReducer (state = initialState, action) {
  const nextState = AppNavigator.router.getStateForAction(action, state)

  return nextState || state
}