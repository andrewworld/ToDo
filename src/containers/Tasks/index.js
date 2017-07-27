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
import { getTasks, setTasks } from '../../utils/dbHelper'
import Icon from 'react-native-vector-icons/MaterialIcons'

const {UIManager} = NativeModules

const STATUS_IN_PROGRESS = 0
const STATUS_DONE = 1

const ACTION_SELECT_ALL = 0
const ACTION_DELETE = 1

const POSITION_UNDER_TOOLBAR = 0
const POSITION_BEFORE_TOOLBAR = 1

const MAX_COLOR_LIGHTNESS = 75
const MIN_COLOR_LIGHTNESS = 25
const COLOR_HUE = 25
const COLOR_SATURATION = 80

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)

export default class App extends React.PureComponent {

  state = {
    scrollPosition: POSITION_BEFORE_TOOLBAR,
    tasks: [],
    tmpTaskText: '',
    isTaskCreating: false
  }

  renderEmptyView = () => {
    return (
      <View style={styles.emptyViewContainer}>
        <Text
          style={
            [styles.emptyViewText,
              {color: `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`}
            ]}>{`THE\nBEST\nTO-DO APP\nEVER`}</Text>
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
          style={[styles.headerTextInput, {color: `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`}]}
          selectionColor={'#909090'}
          placeholderTextColor={'#909090'}
          placeholder={'Enter your task here...'}
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
              borderColor: tasks.length === 0 ? '#303030' : `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`,
              color: tasks.length === 0 ? '#303030' : `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`
            }]}>{'+'}</Text>
          <Text
            style={[styles.headerText, {
              color: tasks.length === 0 ? '#303030' : `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`
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
              elevation: (tasks.length === 0 && !isTaskCreating) ? 4 : 0,
              backgroundColor: (tasks.length === 0 && !isTaskCreating)
                ? `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`
                : '#303030',
              borderColor: `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`
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

    if (item.selected) borderStyle = {...borderStyle, borderWidth: 3.5, borderColor: '#ffffff'}

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
              elevation: item.selected ? 4 : 0,
              marginTop: item.selected ? 8 : 0,
              marginBottom: item.selected ? 8 : 0,
              backgroundColor: `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS - (index * (MAX_COLOR_LIGHTNESS - MIN_COLOR_LIGHTNESS) / tasks.length)}%)`,
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
        selected: false
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

    if (tasks.some((item) => item.selected)) {
      if (item.selected) tasks[index] = {...item, selected: false}
      else tasks[index] = {...item, selected: true}
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

    if (item.selected) tasks[index] = {...item, selected: false}
    else tasks[index] = {...item, selected: true}

    await setTasks(tasks.map(item => item))

    this.setState({tasks: tasks.map(item => item)})
    LayoutAnimation.spring()
  }

  onPressHeader = () => {
    this.setState({isTaskCreating: true})
  }

  onPressToolbarIcon = async () => {
    let {tasks} = this.state

    tasks.forEach((item, index, arr) => {
      if (item.selected) arr[index] = {...item, selected: false}
    })

    await setTasks(tasks.map(item => item))

    this.setState({tasks: tasks.map(item => item)})
    LayoutAnimation.spring()
  }

  onScrollList = (event) => {
    if (event.nativeEvent.contentOffset.y === 0) {
      this.setState({scrollPosition: POSITION_BEFORE_TOOLBAR})
    } else {
      this.setState({scrollPosition: POSITION_UNDER_TOOLBAR})
    }
  }

  onActionSelected = async (action) => {
    let {tasks} = this.state

    switch (action) {
      case ACTION_SELECT_ALL:
        tasks.forEach((item, index, arr) => {
          if (!item.selected) arr[index] = {...item, selected: true}
        })

        await setTasks(tasks.map(item => item))

        this.setState({tasks: tasks.map(item => item)})
        break
      case ACTION_DELETE:
        let notSelectedTasks = tasks.filter(item => !item.selected)

        await setTasks(notSelectedTasks)

        this.setState({tasks: notSelectedTasks})
        break
    }

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
    let {tasks, scrollPosition} = this.state
    let toolbar
    let selectedTasks = 0

    tasks.forEach(item => {
      if (item.selected) selectedTasks++
    })

    if (tasks.some(item => item.selected)) {
      toolbar = <Icon.ToolbarAndroid
        style={styles.toolbarSelectionMode}
        title={`${selectedTasks}`}
        navIconName={'clear'}
        onIconClicked={this.onPressToolbarIcon}
        actions={[
          {title: 'Select all', iconName: 'select-all', show: 'always'},
          {title: 'Delete', iconName: 'delete', show: 'always'}
        ]}
        onActionSelected={this.onActionSelected}
        titleColor={'#ffffff'}/>
    } else {
      toolbar = <Icon.ToolbarAndroid
        style={[styles.toolbarDefault, {elevation: scrollPosition === POSITION_UNDER_TOOLBAR ? 4 : 0}]}
        title="Quick Tasks"
        titleColor={'#ffffff'}/>
    }

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#000'}
          barStyle="light-content"/>
        {toolbar}
        <FlatList
          keyExtractor={(item, index) => index}
          data={tasks}
          renderItem={this.renderItem}
          onScroll={this.onScrollList}
          ListEmptyComponent={this.renderEmptyView}
          ListHeaderComponent={this.renderHeader}
          ListFooterComponent={() => <View style={styles.footer}/>}/>
      </View>
    )
  }
}

