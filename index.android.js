import React from 'react'
import { AppRegistry, AsyncStorage } from 'react-native'
import { Provider } from 'react-redux'
import { applyMiddleware, combineReducers, createStore } from 'redux'
import dataReducer from './src/redux/reducers/dataReducer'
import thunk from 'redux-thunk'
import AppNavigatorContainer from './src/containers/AppNavigatorContainer'
import navigationReducer from './src/redux/reducers/navigationReducer'
import { persistStore } from 'redux-persist'
import selectableListReducer from './src/redux/reducers/selectableListReducer'

const reducer = combineReducers({
  navigationState: navigationReducer,
  dataState: dataReducer,
  selectableListState: selectableListReducer
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
