import React from 'react'
import {
  Alert,
  FlatList,
  LayoutAnimation,
  NativeModules,
  StatusBar,
  Text,
  TextInput,
  ToolbarAndroid,
  TouchableNativeFeedback,
  View
} from 'react-native'
import styles from './styles'
import { getTasks, setTasks } from '../../helpers/dbHelper'

const {UIManager} = NativeModules

const STATE_EXPANDED = 0
const STATE_COLLAPSED = 1
const ITEM_HEIGHT_EXPANDED = 196
const ITEM_HEIGHT_COLLAPSED = 68
const MAX_COLOR_LIGHTNESS = 75
const MIN_COLOR_LIGHTNESS = 25

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)

export default class App extends React.Component {

  state = {tasks: [], isCreating: false, tmpTaskText: ''}

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
    let {tasks} = this.state
    let borderStyle, view

    if (tasks.length === 0) borderStyle = {borderRadius: 2, borderWidth: 3.5}
    else borderStyle = {borderTopLeftRadius: 2, borderTopRightRadius: 2, borderWidth: 3.5}

    if (this.state.isCreating) {
      view = (
        <TextInput
          value={this.state.tmpTaskText}
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
              backgroundColor: (tasks.length === 0 && !this.state.isCreating) ? `hsl(25, 100%, ${MAX_COLOR_LIGHTNESS}%)` : '#303030',
              height: ITEM_HEIGHT_COLLAPSED,
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
    let height, borderStyle

    if (index === tasks.length - 1) borderStyle = {borderBottomLeftRadius: 2, borderBottomRightRadius: 2}
    else borderStyle = {}

    switch (item.state) {
      case STATE_COLLAPSED:
        height = ITEM_HEIGHT_COLLAPSED
        break
      case STATE_EXPANDED:
        height = ITEM_HEIGHT_EXPANDED
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
              height,
              backgroundColor: `hsl(25, 100%, ${MAX_COLOR_LIGHTNESS - (index * (MAX_COLOR_LIGHTNESS - MIN_COLOR_LIGHTNESS) / tasks.length)}%)`,
              justifyContent: 'center',
            }
          ]}>
          <Text style={styles.itemTitle}>{item.title}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  removeAllItems = async () => {
    await setTasks([])

    this.setState({tasks: []})
    LayoutAnimation.spring()
  }

  removeItem = async (item, index) => {
    let {tasks} = this.state

    tasks.splice(index, 1)

    await setTasks(tasks.map(item => item))

    this.setState({tasks: tasks.map(item => item)})
    LayoutAnimation.spring()
  }

  onEndEditing = async () => {
    let {tasks, tmpTaskText} = this.state

    if (tmpTaskText && tmpTaskText.trim() !== '') {
      tasks.unshift({
        date: new Date(),
        title: tmpTaskText,
        state: STATE_COLLAPSED
      })

      await setTasks(tasks.map(item => item))

      this.setState({isCreating: false, tasks: tasks.map(item => item), tmpTaskText: ''})
      LayoutAnimation.spring()
    } else {
      this.setState({isCreating: false, tmpTaskText: ''})
    }
  }

  onPressItem = async (item, index) => {
    let {tasks} = this.state

    switch (item.state) {
      case STATE_COLLAPSED:
        tasks[index] = {...item, state: STATE_EXPANDED}
        break
      case STATE_EXPANDED:
        tasks[index] = {...item, state: STATE_COLLAPSED}
        break
    }

    await setTasks(tasks.map(item => item))

    this.setState({tasks: tasks.map(item => item)})
    LayoutAnimation.spring()
  }

  onLongPressItem = (item, index) => {
    Alert.alert(
      `Remove ${item.title}`,
      'Are you sure?',
      [
        {text: 'CANCEL', style: 'cancel'},
        {text: 'REMOVE', onPress: () => this.removeItem(item, index)},
        {text: 'REMOVE ALL', onPress: () => this.removeAllItems()}
      ],
      {cancelable: true}
    )
  }

  onPressHeader = () => {
    this.setState({isCreating: true})
  }

  async componentDidMount () {
    let tasks = await getTasks()

    if (tasks) {
      this.setState({tasks})
    }
  }

  render () {
    let {tasks} = this.state

    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#000'}
          barStyle="light-content"
        />
        <ToolbarAndroid
          style={styles.toolbar}
          title="TO-DO List"
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

