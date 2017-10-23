import React from 'react'
import { connect } from 'react-redux'
import { View } from 'react-native'
import { Header, StackNavigator } from 'react-navigation'
import { addKey, clearKeys, removeKey } from '../../redux/actions/selectableListActions'
import { goBack, openNewTask } from '../../redux/actions/navigationActions'
import { deleteTask } from '../../redux/actions/dataActions'
import Tasks from '../../containers/Tasks/index'
import NewTask from '../../containers/NewTask/index'
import StatusBarPage from '../../components/StatusBarPage/index'
import HeaderIcon from '../../components/HeaderIcon/index'
import Constants from '../../utils/Constants'
import styles from './styles'

export const TASKS = 'Tasks'
export const NEW_TASK = 'NewTask'

export default StackNavigator(
  {
    [TASKS]: {
      screen: (props) => (
        <Tasks
          onPressActionButton={() => props.navigation.dispatch(openNewTask())}
          selectedCount={props.navigation.state.params && props.navigation.state.params.selectedCount || 0}
          setSelectedCount={(selectedCount) => props.navigation.setParams({selectedCount})}/>
      ),
      navigationOptions: ({navigation}) => ({
        title: navigation.state.params && navigation.state.params.selectedCount !== 0
          ? navigation.state.params && navigation.state.params.selectedCount
          : 'Quick Tasks',
        headerTintColor: Constants.color.WHITE,
        headerStyle: {
          backgroundColor: Constants.color.PRIMARY_DARK
        },
        headerTitleStyle: navigation.state.params && navigation.state.params.selectedCount !== 0
          ? styles.counter
          : null,
        headerRight: navigation.state.params && navigation.state.params.selectedCount > 0
          ? <TasksHeaderRightRedux navigation={navigation}/>
          : null,
        headerLeft: navigation.state.params && navigation.state.params.selectedCount > 0
          ? <TasksHeaderLeft navigation={navigation}/>
          : null,
        header: (props) => (
          <StatusBarPage contentClipElevation={4} contentClipColor={Constants.color.PRIMARY_DARK}>
            <Header {...props}/>
          </StatusBarPage>
        )
      })
    },
    [NEW_TASK]: {
      screen: NewTask,
      navigationOptions: ({navigation}) => ({
        headerTintColor: Constants.color.WHITE,
        headerStyle: {
          backgroundColor: Constants.color.PRIMARY,
          elevation: 0
        },
        headerLeft: <NewTaskHeaderLeft navigation={navigation}/>,
        header: (props) => (
          <StatusBarPage contentClipColor={Constants.color.PRIMARY}>
            <Header {...props}/>
          </StatusBarPage>
        )
      })
    },
  }
)

const TasksHeaderRightRedux = connect(
  (state) => ({
    tasks: state.dataState.tasks,
    keys: state.selectableListState.keys
  }),
  (dispatch) => ({
    deleteTask: (key) => dispatch(deleteTask(key)),
    addKey: (key) => dispatch(addKey(key)),
    removeKey: (key) => dispatch(removeKey(key)),
    clearKeys: () => dispatch(clearKeys())
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    onPressDelete: () => {
      stateProps.keys.forEach(key => dispatchProps.deleteTask(key))
      dispatchProps.clearKeys()
      ownProps.navigation.setParams({selectedCount: 0})
    },
    onPressSelect: () => {
      stateProps.tasks.forEach(task => dispatchProps.addKey(task.key))
      ownProps.navigation.setParams({selectedCount: stateProps.tasks.length})
    }
  })
)(TasksHeaderRight)

function TasksHeaderRight ({onPressDelete, onPressSelect}) {
  return (
    <View style={styles.rowContainer}>
      <HeaderIcon
        icon={'select-all'}
        onPress={onPressSelect}
        iconStyle={styles.icon}/>
      <HeaderIcon
        icon={'delete'}
        onPress={onPressDelete}
        iconStyle={styles.icon}/>
    </View>
  )
}

function TasksHeaderLeft ({navigation}) {
  return (
    <HeaderIcon
      icon={'close'}
      onPress={() => {
        navigation.dispatch(clearKeys())
        navigation.setParams({selectedCount: 0})
      }}
      iconStyle={styles.icon}/>
  )
}

function NewTaskHeaderLeft ({navigation}) {
  return (
    <HeaderIcon
      icon={'close'}
      onPress={() => navigation.dispatch(goBack())}
      iconStyle={styles.icon}/>
  )
}
