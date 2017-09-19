import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import dataReducer from './src/redux/reducers/dataReducer'
import thunk from 'redux-thunk'
import AppNavigator from './src/navigators/AppNavigator'
import navigationReducer from './src/redux/reducers/navigationReducer'
import { persistStore } from 'redux-persist'

const reducer = combineReducers({
  navigationState: navigationReducer,
  dataState: dataReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
persistStore(store, {storage: AsyncStorage})

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
