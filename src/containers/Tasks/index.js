import React from 'react'
import { FlatList, LayoutAnimation, NativeModules, Text, TouchableNativeFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActionButton from 'react-native-action-button'
import { toggleTaskSelection, toggleTaskStatus } from '../../redux/actions/dataActions'
import Constants from '../../utils/Constants'
import styles from './styles'

const {UIManager} = NativeModules
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

export const MAX_COLOR_LIGHTNESS = 75
export const MIN_COLOR_LIGHTNESS = 25
export const COLOR_HUE = 25
export const COLOR_SATURATION = 80

@connect(
  (state) => ({
    items: state.dataState.tasks
  }),
  (dispatch) => ({
    toggleTaskSelection: (id) => dispatch(toggleTaskSelection(id)),
    toggleTaskStatus: (id) => dispatch(toggleTaskStatus(id))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...stateProps,
    onPressItem: (item) => {
      if (ownProps.selectedCount > 0) {
        if (item.selected) ownProps.setSelectedCount(ownProps.selectedCount - 1)
        else ownProps.setSelectedCount(ownProps.selectedCount + 1)
        dispatchProps.toggleTaskSelection(item.id)
      } else {
        dispatchProps.toggleTaskStatus(item.id)
      }
    },
    onLongPressItem: (item) => {
      if (item.selected) ownProps.setSelectedCount(ownProps.selectedCount - 1)
      else ownProps.setSelectedCount(ownProps.selectedCount + 1)
      dispatchProps.toggleTaskSelection(item.id)
    }
  })
)
export default class Tasks extends React.PureComponent {

  state = {width: 0, height: 0}

  constructor (props) {
    super(props)

    this._renderEmptyView = this._renderEmptyView.bind(this)
    this._renderItem = this._renderItem.bind(this)
    this._onLayout = this._onLayout.bind(this)
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
        background={TouchableNativeFeedback.Ripple(Constants.color.RIPPLE, false)}
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
          {item.done ? <Icon
            style={styles.itemIcon}
            name={'check-circle'}
            size={24}
          /> : null}
          <Text
            style={[
              styles.itemTitle,
              {textDecorationLine: item.done ? 'line-through' : 'none'}
            ]}>{item.title}</Text>
        </View>
      </TouchableNativeFeedback>
    )
  }

  _onLayout (event) {
    const {width, height} = event.nativeEvent.layout

    this.setState({width, height})
  }

  componentWillUpdate () {
    LayoutAnimation.configureNext(animationConfig)
  }

  render () {
    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={(item, index) => index}
          data={this.props.items}
          keyboardShouldPersistTaps={'handled'}
          onLayout={this._onLayout}
          renderItem={this._renderItem}
          ListEmptyComponent={this._renderEmptyView}
          contentContainerStyle={this.props.items.length ? styles.flatListContent : {padding: 0}}
          style={styles.flatList}/>
        <ActionButton
          fixNativeFeedbackRadius
          onPress={this.props.onPressActionButton}
          buttonTextStyle={{color: Constants.color.PRIMARY}}
          buttonColor={`hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`}/>
      </View>
    )
  }
}

