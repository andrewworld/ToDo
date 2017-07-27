import React from 'react'
import { StackNavigator } from 'react-navigation'
import Tasks from '../Tasks/index'

const Navigator = StackNavigator(
  {Tasks: {screen: Tasks}},
  {headerMode: 'none'}
)

export default class App extends React.PureComponent {

  render () {
    return (
      <Navigator/>
    )
  }
}