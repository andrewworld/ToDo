import React from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import Icon from 'react-native-vector-icons/MaterialIcons'
import ActionButton from 'react-native-action-button'
import { toggleTaskStatus } from '../../redux/actions/dataActions'
import Constants from '../../utils/Constants'
import styles from './styles'
import SelectableList from '../SelectableList/index'

export const MAX_COLOR_LIGHTNESS = 75
export const MIN_COLOR_LIGHTNESS = 25
export const COLOR_HUE = 25
export const COLOR_SATURATION = 80

@connect(
  (state) => ({
    items: state.dataState.tasks,
    selectedItemsKeys: state.selectableListState.keys
  }),
  (dispatch) => ({
    toggleTaskStatus: (key) => dispatch(toggleTaskStatus(key))
  }),
  (stateProps, dispatchProps, ownProps) => ({
    ...ownProps,
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

    this._renderItem = this._renderItem.bind(this)
  }

  static _renderEmptyView () {
    return (
      <Text
        style={[
          styles.emptyViewText,
          {color: `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`}
        ]}>
        {`THE\nBEST\nTO-DO APP\nEVER`}
      </Text>
    )
  }

  _renderItem (item, index, selected) {
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
      <View
        style={[
          styles.item,
          borderStyle,
          {
            elevation: selected ? 4 : 0,
            marginTop: selected ? 8 : 0,
            marginBottom: selected ? 8 : 0,
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
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <SelectableList
          items={this.props.items}
          renderItem={this._renderItem}
          ListEmptyComponent={Tasks._renderEmptyView}
          onPressItem={this.props.onPressItem}
          onLongPressItem={this.props.onLongPressItem}/>
        <ActionButton
          fixNativeFeedbackRadius
          onPress={this.props.onPressActionButton}
          buttonTextStyle={{color: Constants.color.PRIMARY}}
          buttonColor={`hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`}/>
      </View>
    )
  }
}

