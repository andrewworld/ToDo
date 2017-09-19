import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addNavigationHelpers, StackNavigator } from 'react-navigation'
import Tasks from '../components/Tasks/index'
import NewTask from '../components/NewTask/index'
import { goBack, openNewTask } from '../redux/actions/navigationActions'
import {
  createTask,
  deleteSelectedTasks,
  deselectTasks,
  selectTasks,
  toggleTaskSelection,
  toggleTaskStatus
} from '../redux/actions/dataActions'

export const TASKS = 'Tasks'
export const NEW_TASK = 'NewTask'

export const Navigator = StackNavigator(
  {
    [TASKS]: {
      screen: connect(
        (state) => ({
          items: state.dataState.tasks
        }),
        (dispatch) => ({
          toggleTaskSelection: bindActionCreators(toggleTaskSelection, dispatch),
          toggleTaskStatus: bindActionCreators(toggleTaskStatus, dispatch),
          onPressToolbarIcon: bindActionCreators(deselectTasks, dispatch),
          onPressActionSelectAll: bindActionCreators(selectTasks, dispatch),
          onPressActionDelete: bindActionCreators(deleteSelectedTasks, dispatch),
          onPressActionButton: bindActionCreators(openNewTask, dispatch)
        }),
        (stateProps, dispatchProps, ownProps) => ({
          ...stateProps,
          ...dispatchProps,
          ...ownProps,
          onPressItem: (item) => {
            if (stateProps.items.some(item => item.selected)) dispatchProps.toggleTaskSelection(item.id)
            else dispatchProps.toggleTaskStatus(item.id)
          },
          onLongPressItem: (item) => dispatchProps.toggleTaskSelection(item.id)
        })
      )(Tasks)
    },
    [NEW_TASK]: {
      screen: connect(
        null,
        (dispatch) => ({
          onPressNavIcon: bindActionCreators(goBack, dispatch),
          onPressActionSend: (text) => {
            if (text.trim()) {
              dispatch(createTask(text))
              dispatch(goBack())
            }
          }
        })
      )(NewTask)
    },
  },
  {headerMode: 'none'}
)

class AppNavigator extends React.Component {
  render () {
    return (
      <Navigator navigation={addNavigationHelpers({
        dispatch: this.props.dispatch,
        state: this.props.navigationState,
      })}/>
    )
  }
}

export default connect(state => ({navigationState: state.navigationState}))(AppNavigator)
