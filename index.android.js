import React from 'react'
import { Provider } from 'react-redux'
import { AppRegistry } from 'react-native'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import dataReducer from './src/redux/reducers/dataReducer'
import thunk from 'redux-thunk'
import AppNavigator from './src/navigators/AppNavigator'
import navigationReducer from './src/redux/reducers/navigationReducer'

const reducer = combineReducers({
  navigationState: navigationReducer,
  dataState: dataReducer
})

const store = createStore(reducer, applyMiddleware(thunk))

class App extends React.PureComponent {

  render () {
    return (
      <Provider store={store}>
        <AppNavigator/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('ToDo', () => App)
