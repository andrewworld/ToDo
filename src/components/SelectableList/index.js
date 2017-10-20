import React from 'react'
import { TouchableNativeFeedback } from 'react-native'
import Constants from '../../utils/Constants'
import List from '../List/index'

export default class SelectableList extends React.PureComponent {

  static defaultProps = {
    ListEmptyComponent: () => {},
    onPressItem: () => {},
    onLongPressItem: () => {},
  }

  state = {selectedItemsKeys: []}

  constructor (props) {
    super(props)

    this.deselectAll = this.deselectAll.bind(this)
    this._toggleSelection = this._toggleSelection.bind(this)
    this._checkIsSelected = this._checkIsSelected.bind(this)
    this._renderItem = this._renderItem.bind(this)
    this._onPressItem = this._onPressItem.bind(this)
    this._onLongPressItem = this._onLongPressItem.bind(this)
  }

  get selectedItemsKeys () {
    return this.state.selectedItemsKeys
  }

  deselectAll () {
    this.setState({selectedItemsKeys: []})
  }

  _checkIsSelected (key) {
    return this.state.selectedItemsKeys.some(item => item === key)
  }

  _toggleSelection (key) {
    if (this._checkIsSelected(key)) {
      this.setState({selectedItemsKeys: this.state.selectedItemsKeys.filter(item => item !== key)})
    }
    else {
      let keys = this.state.selectedItemsKeys.map(item => item)
      keys.push(key)
      this.setState({selectedItemsKeys: keys})
    }
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
    if (this.selectedItemsKeys.length) this._toggleSelection(item.key)
    this.props.onPressItem(item, index, selected)
  }

  _onLongPressItem (item, index, selected) {
    this._toggleSelection(item.key)
    this.props.onLongPressItem(item, index, selected)
  }

  render () {
    return (
      <List
        data={this.props.items}
        extraData={this.state}
        renderItem={this._renderItem}
        ListEmptyComponent={this.props.ListEmptyComponent}/>
    )
  }
}

