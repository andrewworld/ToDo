import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import dataReducer from './src/redux/reducers/dataReducer'
import navigationReducer from './src/redux/reducers/navigationReducer'
import selectedTasksReducer from './src/redux/reducers/selectedTasksReducer'
import AppNavigatorContainer from './src/containers/AppNavigatorContainer'

const reducer = combineReducers({
  navigationState: navigationReducer,
  dataState: dataReducer,
  selectedTasksState: selectedTasksReducer
})

const store = createStore(reducer, applyMiddleware(thunk))
persistStore(store, {storage: AsyncStorage})

class App extends React.PureComponent {

  render () {
    return (
      <Provider store={store}>
        <AppNavigatorContainer/>
      </Provider>
    )
  }
}

AppRegistry.registerComponent('ToDo', () => App)
