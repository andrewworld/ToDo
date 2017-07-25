import React from 'react'
import {
  FlatList,
  LayoutAnimation,
  NativeModules,
  StatusBar,
  Text,
  TextInput,
  TouchableNativeFeedback,
  View
} from 'react-native'
import styles from './styles'
import { getTasks, setTasks } from '../../helpers/dbHelper'
import Icon from 'react-native-vector-icons/MaterialIcons'

const {UIManager} = NativeModules

const STATUS_IN_PROGRESS = 0
const STATUS_DONE = 1
const MAX_COLOR_LIGHTNESS = 75
const MIN_COLOR_LIGHTNESS = 25

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)

export default class App extends React.Component {

  state = {tasks: [], isTaskCreating: false, tmpTaskText: ''}

  renderEmptyView = () => {
    return (
      <View style={{flex: 1, marginTop: 144, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            color: `hsl(25, 100%, ${MAX_COLOR_LIGHTNESS}%)`,
            fontSize: 24,
            fontWeight: '500'
          }}>{`THE\nBEST\nTO-DO APP\nEVER`}</Text>
      </View>
    )
  }

  renderHeader = () => {
    let {tasks, isTaskCreating, tmpTaskText} = this.state
    let borderStyle, view

    if (tasks.length === 0) borderStyle = {borderRadius: 2, borderWidth: 3.5}
    else borderStyle = {borderTopLeftRadius: 2, borderTopRightRadius: 2, borderWidth: 3.5}

    if (isTaskCreating) {
      view = (
        <TextInput
          value={tmpTaskText}
          autoFocus={true}
          style={[styles.headerTextInput, {color: `hsl(25, 100%, ${MAX_COLOR_LIGHTNESS}%)`}]}
          selectionColor={'#909090'}
          autoCapitalize={'sentences'}
          underlineColorAndroid={'#00000000'}
          onChangeText={(text) => this.setState({tmpTaskText: text})}
          onEndEditing={this.onEndEditing}
        />)
    } else {
      view = (
        <View style={{flexDirection: 'row'}}>
          <Text
            style={[styles.headerPlusText, {
              borderColor: tasks.length === 0 ? '#303030' : `hsl(25, 100%, ${MAX_COLOR_LIGHTNESS}%)`,
              color: tasks.length === 0 ? '#303030' : `hsl(25, 100%, ${MAX_COLOR_LIGHTNESS}%)`
            }]}>{'+'}</Text>
          <Text
            style={[styles.headerText, {
              color: tasks.length === 0 ? '#303030' : `hsl(25, 100%, ${MAX_COLOR_LIGHTNESS}%)`
            }]}>{'Create new task'}</Text>
        </View>)
    }

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#909090', false)}
        onPress={this.onPressHeader}>
        <View
          style={[
            styles.header,
            borderStyle,
            {
              backgroundColor: (tasks.length === 0 && !isTaskCreating) ? `hsl(25, 100%, ${MAX_COLOR_LIGHTNESS}%)` : '#303030',
              borderColor: `hsl(25, 100%, ${MAX_COLOR_LIGHTNESS}%)`
            }
          ]}>
          {view}
        </View>
      </TouchableNativeFeedback>
    )
  }

  renderItem = ({item, index}) => {
    let {tasks} = this.state
    let textDecorationLine, iconDisplay, borderStyle

    if (index === tasks.length - 1) borderStyle = {borderBottomLeftRadius: 2, borderBottomRightRadius: 2}
    else borderStyle = {}

    if (item.highlighted) borderStyle = {...borderStyle, borderWidth: 3.5, borderColor: '#ffffff'}

    switch (item.status) {
      case STATUS_IN_PROGRESS:
        iconDisplay = 'none'
        textDecorationLine = 'none'
        break
      case STATUS_DONE:
        iconDisplay = 'flex'
        textDecorationLine = 'line-through'
        break
    }

    return (
      <TouchableNativeFeedback
        background={TouchableNativeFeedback.Ripple('#e5e5e5', false)}
        onPress={() => this.onPressItem(item, index)}
        onLongPress={() => this.onLongPressItem(item, index)}>
        <View
          style={[
            styles.item,
            borderStyle,
            {
              backgroundColor: `hsl(25, 100%, ${MAX_COLOR_LIGHTNESS - (index * (MAX_COLOR_LIGHTNESS - MIN_COLOR_LIGHTNESS) / tasks.length)}%)`,
            }
          ]}>
          <Icon
            style={[styles.itemIcon, {display: iconDisplay}]}
            name={'done'}
            size={24}
          />
          <Text style={[styles.itemTitle, {textDecorationLine}]}>{item.title}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  onEndEditing = async () => {
    let {tasks, tmpTaskText} = this.state

    if (tmpTaskText && tmpTaskText.trim() !== '') {
      tasks.unshift({
        title: tmpTaskText,
        status: STATUS_IN_PROGRESS,
        highlighted: false
      })

      await setTasks(tasks.map(item => item))

      this.setState({isTaskCreating: false, tasks: tasks.map(item => item), tmpTaskText: ''})
      LayoutAnimation.spring()
    } else {
      this.setState({isTaskCreating: false, tmpTaskText: ''})
    }
  }

  onPressItem = async (item, index) => {
    let {tasks} = this.state

    if (tasks.some((item) => item.highlighted)) {
      if (item.highlighted) tasks[index] = {...item, highlighted: false}
      else tasks[index] = {...item, highlighted: true}
    } else {
      switch (item.status) {
        case STATUS_IN_PROGRESS:
          tasks[index] = {...item, status: STATUS_DONE}
          break
        case STATUS_DONE:
          tasks[index] = {...item, status: STATUS_IN_PROGRESS}
          break
      }
    }

    await setTasks(tasks.map(item => item))

    this.setState({tasks: tasks.map(item => item)})
    LayoutAnimation.spring()
  }

  onLongPressItem = async (item, index) => {
    let {tasks} = this.state

    if (item.highlighted) {
      tasks[index] = {...item, highlighted: false}
    } else {
      tasks[index] = {...item, highlighted: true}
    }

    await setTasks(tasks.map(item => item))

    this.setState({tasks: tasks.map(item => item)})
    LayoutAnimation.spring()
  }

  onPressHeader = () => {
    this.setState({isTaskCreating: true})
  }

  onActionSelected = async () => {
    let {tasks} = this.state

    let notHighlightedTasks = tasks.filter((item, index, arr) => !item.highlighted)

    await setTasks(notHighlightedTasks)

    this.setState({tasks: notHighlightedTasks})
    LayoutAnimation.spring()
  }

  async componentDidMount () {
    let tasks = await getTasks()

    if (tasks) {
      this.setState({tasks})
    } else {
      await setTasks(this.state.tasks)
    }
  }

  render () {
    let {tasks} = this.state
    let actions = [{title: 'Settings', iconName: 'settings', show: 'always'}]

    if (tasks.some((item) => item.highlighted)) actions.push({title: 'Delete', iconName: 'delete', show: 'always'})

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#000'}
          barStyle="light-content"
        />
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          title="TO-DO List"
          actions={[{title: 'Delete', iconName: 'delete', show: 'always'}]}
          onActionSelected={this.onActionSelected}
          titleColor={'#ffffff'}/>
        <FlatList
          keyExtractor={(item, index) => index}
          data={tasks}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmptyView}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={() => <View style={styles.separator}/>}
        />
      </View>
    )
  }
}

