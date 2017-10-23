import React from 'react'
import { TouchableNativeFeedback } from 'react-native'
import { connect } from 'react-redux'
import Constants from '../../utils/Constants'
import List from '../../components/List/index'
import { addKey, removeKey } from '../../redux/actions/selectableListActions'

@connect(
  (state) => ({
    keys: state.selectableListState.keys
  }),
  (dispatch) => ({
    addKey: (key) => dispatch(addKey(key)),
    removeKey: (key) => dispatch(removeKey(key)),
  })
)
export default class SelectableList extends React.PureComponent {

  constructor (props) {
    super(props)

    this._checkIsSelected = this._checkIsSelected.bind(this)
    this._renderItem = this._renderItem.bind(this)
    this._onPressItem = this._onPressItem.bind(this)
    this._onLongPressItem = this._onLongPressItem.bind(this)
  }

  _checkIsSelected (checkKey) {
    return this.props.keys.some(key => key === checkKey)
  }

  _renderItem ({item, index}) {
    const selected = this._checkIsSelected(item.key)

    return (
      <TouchableNativeFeedback
        delayPressIn={0}
        background={TouchableNativeFeedback.Ripple(Constants.color.RIPPLE, false)}
        onPress={() => this._onPressItem(item, index, selected)}
        onLongPress={() => this._onLongPressItem(item, index, selected)}>
        {this.props.renderItem(item, index, selected)}
      </TouchableNativeFeedback>
    )
  }

  _onPressItem (item, index, selected) {
    if (this.props.keys.length) selected ? this.props.removeKey(item.key) : this.props.addKey(item.key)
    this.props.onPressItem(item, index, selected)
  }

  _onLongPressItem (item, index, selected) {
    this.props.addKey(item.key)
    this.props.onLongPressItem(item, index, selected)
  }

  render () {
    return (
      <List
        data={this.props.items}
        extraData={this.props.keys}
        renderItem={this._renderItem}
        ListEmptyComponent={this.props.ListEmptyComponent}/>
    )
  }
}

