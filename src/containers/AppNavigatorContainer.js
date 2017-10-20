import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { BackHandler } from 'react-native'
import { addNavigationHelpers } from 'react-navigation'
import { goBack } from '../redux/actions/navigationActions'
import AppNavigator from '../navigators/AppNavigator/index'

@connect(
  (state) => ({
    navigationState: state.navigationState
  }),
  (dispatch) => ({
    dispatch: dispatch,
    goBack: () => dispatch(goBack()),
  })
)
export default class AppNavigatorContainer extends PureComponent {

  constructor (props) {
    super(props)

    this._onBackPress = this._onBackPress.bind(this)
  }

  _onBackPress () {
    this.props.goBack()
    return true
  }

  componentDidMount () {
    BackHandler.addEventListener('hardwareBackPress', this._onBackPress)
  }

  componentWillUnmount () {
    BackHandler.removeEventListener('hardwareBackPress', this._onBackPress)
  }

  render () {
    return (
      <AppNavigator
        navigation={addNavigationHelpers({
          state: this.props.navigationState,
          dispatch: this.props.dispatch
        })}/>
    )
  }
}