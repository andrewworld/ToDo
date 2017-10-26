import React from 'react'
import { Text, TouchableNativeFeedback, View } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActionButton from 'react-native-action-button'
import { toggleTaskStatus } from '../../redux/actions/dataActions'
import { addKey, removeKey } from '../../redux/actions/selectedTasksActions'
import List from '../../components/List'
import Constants from '../../utils/Constants'
import styles from './styles'

@connect(
  (state) => ({
    items: state.dataState.tasks,
    selectedItemsKeys: state.selectedTasksState.keys
  }),
  (dispatch) => ({
    addKey: (key) => dispatch(addKey(key)),
    removeKey: (key) => dispatch(removeKey(key)),
    toggleTaskStatus: (key) => dispatch(toggleTaskStatus(key))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
    ...dispatchProps,
    ...stateProps,
    onPressItem: (item, index, selected) => {
      if (ownProps.selectedCount > 0) {
        if (selected) ownProps.setSelectedCount(ownProps.selectedCount - 1)
        else ownProps.setSelectedCount(ownProps.selectedCount + 1)
      } else {
        dispatchProps.toggleTaskStatus(item.key)
      }
    },
    onLongPressItem: (item, index, selected) => {
      if (selected) ownProps.setSelectedCount(ownProps.selectedCount - 1)
      else ownProps.setSelectedCount(ownProps.selectedCount + 1)
    }
  })
)
export default class Tasks extends React.PureComponent {

  constructor (props) {
    super(props)

    this._checkIsSelected = this._checkIsSelected.bind(this)
    this._renderItem = this._renderItem.bind(this)
    this._onPressItem = this._onPressItem.bind(this)
    this._onLongPressItem = this._onLongPressItem.bind(this)
  }

  static _renderEmptyView () {
    return (
      <Text
        style={[
          styles.emptyViewText,
          {color: `hsl(${Constants.constant.COLOR_HUE}, ${Constants.constant.COLOR_SATURATION}%, ${Constants.constant.MAX_COLOR_LIGHTNESS}%)`}
        ]}>
        {`THE\nBEST\nTO-DO APP\nEVER`}
      </Text>
    )
  }

  _checkIsSelected (checkKey) {
    return this.props.selectedItemsKeys.some(key => key === checkKey)
  }

  _onPressItem (item, index, selected) {
    if (this.props.selectedItemsKeys.length) selected ? this.props.removeKey(item.key) : this.props.addKey(item.key)
    this.props.onPressItem(item, index, selected)
  }

  _onLongPressItem (item, index, selected) {
    this.props.addKey(item.key)
    this.props.onLongPressItem(item, index, selected)
  }

  _renderItem ({item, index}) {
    const selected = this._checkIsSelected(item.key)

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

    if (selected) borderStyle = styles.itemSelectedBorder

    return (
      <TouchableNativeFeedback
        delayPressIn={0}
        background={TouchableNativeFeedback.Ripple(Constants.color.RIPPLE, false)}
        onPress={() => this._onPressItem(item, index, selected)}
        onLongPress={() => this._onLongPressItem(item, index, selected)}>
        <View
          style={[
            styles.item,
            borderStyle,
            {
              elevation: selected ? 4 : 0,
              marginTop: selected ? 8 : 0,
              marginBottom: selected ? 8 : 0,
              backgroundColor: `hsl(${Constants.constant.COLOR_HUE}, ${Constants.constant.COLOR_SATURATION}%, ${Constants.constant.MAX_COLOR_LIGHTNESS -
              (index * (Constants.constant.MAX_COLOR_LIGHTNESS - Constants.constant.MIN_COLOR_LIGHTNESS) / this.props.items.length)}%)`,
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

  render () {
    return (
      <View style={styles.container}>
        <List
          data={this.props.items}
          extraData={this.props.selectedItemsKeys}
          renderItem={this._renderItem}
          ListEmptyComponent={Tasks._renderEmptyView}
          onPressItem={this._onPressItem}
          onLongPressItem={this._onLongPressItem}/>
        <ActionButton
          fixNativeFeedbackRadius
          onPress={this.props.onPressActionButton}
          buttonTextStyle={{color: Constants.color.PRIMARY}}
          buttonColor={`hsl(${Constants.constant.COLOR_HUE}, ${Constants.constant.COLOR_SATURATION}%, ${Constants.constant.MAX_COLOR_LIGHTNESS}%)`}/>
      </View>
    )
  }
}

