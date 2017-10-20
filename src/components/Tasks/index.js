import React from 'react'
import { FlatList, LayoutAnimation, NativeModules, StatusBar, Text, TouchableNativeFeedback, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActionButton from 'react-native-action-button'
import styles from './styles'

const {UIManager} = NativeModules

const ACTION_SELECT_ALL = 0
const ACTION_DELETE = 1

export const TASK_STATUS_IN_PROGRESS = 0
export const TASK_STATUS_DONE = 1

export const MAX_COLOR_LIGHTNESS = 75
export const MIN_COLOR_LIGHTNESS = 25
export const COLOR_HUE = 25
export const COLOR_SATURATION = 80

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)

const animationConfig = {
  duration: 100,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
}

export default class Tasks extends React.PureComponent {

  state = {width: 0, height: 0}

  constructor (props, context) {
    super(props, context)

    this._renderEmptyView = this._renderEmptyView.bind(this)
    this._renderItem = this._renderItem.bind(this)
    this._onLayout = this._onLayout.bind(this)
    this._onActionSelected = this._onActionSelected.bind(this)
  }

  _renderEmptyView () {
    return (
      <View style={[styles.emptyViewContainer, {
        width: this.state.width,
        height: this.state.height,
      }]}>
        <Text
          style={[styles.emptyViewText, {color: `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`}]}>
          {`THE\nBEST\nTO-DO APP\nEVER`}</Text>
      </View>
    )
  }

  _renderItem ({item, index}) {
    let borderStyle

    if (this.props.items.length === 1) {
      borderStyle = styles.itemAloneBorder
    } else {
      switch (index) {
        case 0:
          borderStyle = styles.itemFirstBorder
          break
        case this.props.items.length - 1:
          borderStyle = styles.itemLastBorder
          break
      }
    }

    if (item.selected) borderStyle = styles.itemSelectedBorder

    return (
      <TouchableNativeFeedback
        delayPressIn={0}
        background={TouchableNativeFeedback.Ripple('#e5e5e5', false)}
        onPress={() => this.props.onPressItem(item, index)}
        onLongPress={() => this.props.onLongPressItem(item, index)}>
        <View
          style={[
            styles.item,
            borderStyle,
            {
              elevation: item.selected ? 4 : 0,
              marginTop: item.selected ? 8 : 0,
              marginBottom: item.selected ? 8 : 0,
              backgroundColor: `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS -
              (index * (MAX_COLOR_LIGHTNESS - MIN_COLOR_LIGHTNESS) / this.props.items.length)}%)`,
            }
          ]}>
          {item.status === TASK_STATUS_DONE ? <Icon
            style={styles.itemIcon}
            name={'check-circle'}
            size={24}
          /> : null}
          <Text
            style={[
              styles.itemTitle,
              {textDecorationLine: item.status === TASK_STATUS_DONE ? 'line-through' : 'none'}
            ]}>{item.title}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  _onActionSelected (action) {
    switch (action) {
      case ACTION_SELECT_ALL:
        this.props.onPressActionSelectAll()
        break
      case ACTION_DELETE:
        this.props.onPressActionDelete()
        break
    }
  }

  _onLayout (event) {
    const {width, height} = event.nativeEvent.layout

    this.setState({width, height})
  }

  componentWillUpdate () {
    LayoutAnimation.configureNext(animationConfig)
  }

  render () {
    let toolbar
    let selectedTasks = 0

    this.props.items.forEach(item => {
      if (item.selected) selectedTasks++
    })

    if (this.props.items.some(item => item.selected)) {
      toolbar = <Icon.ToolbarAndroid
        style={styles.toolbar}
        title={`${selectedTasks}`}
        titleColor={'#ffffff'}
        navIconName={'clear'}
        onIconClicked={this.props.onPressToolbarIcon}
        onActionSelected={this._onActionSelected}
        actions={[
          {title: 'Select all', iconName: 'select-all', show: 'always'},
          {title: 'Delete', iconName: 'delete', show: 'always'}
        ]}/>
    } else {
      toolbar = <Icon.ToolbarAndroid
        style={styles.toolbar}
        title={'Quick Tasks'}
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
          style={styles.flatList}
          contentContainerStyle={this.props.items.length ? styles.flatListContent : {padding: 0}}
          data={this.props.items}
          keyboardShouldPersistTaps={'handled'}
          onLayout={this._onLayout}
          renderItem={this._renderItem}
          ListEmptyComponent={this._renderEmptyView}/>
        <ActionButton
          fixNativeFeedbackRadius
          onPress={this.props.onPressActionButton}
          buttonTextStyle={{color: '#303030'}}
          buttonColor={`hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`}/>
      </View>
    )
  }
}

