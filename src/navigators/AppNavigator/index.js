import React from 'react'
import { Header, StackNavigator } from 'react-navigation'
import Tasks from '../../containers/Tasks/index'
import NewTask from '../../containers/NewTask/index'
import StatusBarPage from '../../components/StatusBarPage/index'
import HeaderIcon from '../../components/HeaderIcon/index'
import { deleteSelectedTasks, deselectTasks } from '../../redux/actions/dataActions'
import { goBack, openNewTask } from '../../redux/actions/navigationActions'
import Constants from '../../utils/Constants'
import { Text, View } from 'react-native'
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
          setSelectedCount={(count) => props.navigation.setParams({selectedCount: count})}/>
      ),
      navigationOptions: ({navigation}) => ({
        title: (!navigation.state.params || navigation.state.params.selectedCount === 0) && 'Quick Tasks',
        headerTintColor: Constants.color.WHITE,
        headerStyle: {
          backgroundColor: Constants.color.PRIMARY_DARK
        },
        headerRight: navigation.state.params && navigation.state.params.selectedCount > 0
          ? <TasksHeaderRight navigation={navigation}/>
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

function TasksHeaderLeft ({navigation}) {
  return (
    <View style={styles.rowContainer}>
      <HeaderIcon
        icon={'close'}
        onPress={() => {
          navigation.setParams({selectedCount: 0})
          navigation.dispatch(deselectTasks())
        }}
        iconStyle={styles.icon}/>
      <Text style={styles.counter}>
        {navigation.state.params && navigation.state.params.selectedCount}
      </Text>
    </View>
  )
}

function TasksHeaderRight ({navigation}) {
  return (
    <HeaderIcon
      icon={'delete'}
      onPress={() => {
        navigation.setParams({selectedCount: 0})
        navigation.dispatch(deleteSelectedTasks())
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
