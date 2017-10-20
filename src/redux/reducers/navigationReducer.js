import { NavigationActions } from 'react-navigation'
import Navigator, { TASKS } from '../../navigators/AppNavigator/index'

const initialState = Navigator.router.getStateForAction(NavigationActions.navigate({routeName: TASKS}))

export default function navigationReducer (state = initialState, action) {
  const nextState = Navigator.router.getStateForAction(action, state)

  return nextState || state
}