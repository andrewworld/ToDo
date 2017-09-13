import React from 'react'
import { FlatList, LayoutAnimation, NativeModules, StatusBar, Text, TouchableNativeFeedback, View } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActionButton from 'react-native-action-button'

const {UIManager} = NativeModules

export const TASK_STATUS_IN_PROGRESS = 0
export const TASK_STATUS_DONE = 1

const ACTION_SELECT_ALL = 0
const ACTION_DELETE = 1

const MAX_COLOR_LIGHTNESS = 75
const MIN_COLOR_LIGHTNESS = 25
const COLOR_HUE = 25
const COLOR_SATURATION = 80

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

  renderItem = ({item, index}) => {
    let textDecorationLine, iconDisplay, borderStyle

    if (this.props.items.length === 1) borderStyle = {borderRadius: 2}
    else if (index === this.props.items.length - 1) borderStyle = {
      borderBottomLeftRadius: 2,
      borderBottomRightRadius: 2
    }
    else if (index === 0) borderStyle = {borderTopLeftRadius: 2, borderTopRightRadius: 2}
    else borderStyle = {}

    if (item.selected) borderStyle = {...borderStyle, borderWidth: 3.5, borderColor: '#ffffff'}

    switch (item.status) {
      case TASK_STATUS_IN_PROGRESS:
        iconDisplay = 'none'
        textDecorationLine = 'none'
        break
      case TASK_STATUS_DONE:
        iconDisplay = 'flex'
        textDecorationLine = 'line-through'
        break
    }

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
              backgroundColor: `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS - (index * (MAX_COLOR_LIGHTNESS - MIN_COLOR_LIGHTNESS) / this.props.items.length)}%)`,
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

  onActionSelected = (action) => {
    switch (action) {
      case ACTION_SELECT_ALL:
        this.props.onPressActionSelectAll()
        break
      case ACTION_DELETE:
        this.props.onPressActionDelete()
        break
    }
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
        navIconName={'clear'}
        onIconClicked={this.props.onPressToolbarIcon}
        actions={[
          {title: 'Select all', iconName: 'select-all', show: 'always'},
          {title: 'Delete', iconName: 'delete', show: 'always'}
        ]}
        onActionSelected={this.onActionSelected}
        titleColor={'#ffffff'}/>
    } else {
      toolbar = <Icon.ToolbarAndroid
        style={styles.toolbar}
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
          data={this.props.items}
          keyboardShouldPersistTaps={'handled'}
          contentContainerStyle={styles.flatListContent}
          renderItem={this.renderItem}
          ListEmptyComponent={this.renderEmptyView}/>
        <ActionButton
          fixNativeFeedbackRadius
          onPress={this.props.onPressActionButton}
          buttonTextStyle={{color: '#303030'}}
          buttonColor={`hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`}/>
      </View>
    )
  }
}

