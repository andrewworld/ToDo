import React from 'react'
import { FlatList, LayoutAnimation, NativeModules, TouchableNativeFeedback, View } from 'react-native'
import Constants from '../../utils/Constants'
import styles from './styles'

NativeModules.UIManager.setLayoutAnimationEnabledExperimental &&
NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true)

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

export default class SelectableList extends React.PureComponent {

  static defaultProps = {
    ListEmptyComponent: () => {},
    onPressItem: () => {},
    onLongPressItem: () => {},
  }

  state = {
    width: 0,
    height: 0,
    selectedItemsKeys: []
  }

  constructor (props) {
    super(props)

    this.deselectAll = this.deselectAll.bind(this)
    this._toggleSelection = this._toggleSelection.bind(this)
    this._checkIsSelected = this._checkIsSelected.bind(this)
    this._renderEmptyView = this._renderEmptyView.bind(this)
    this._renderItem = this._renderItem.bind(this)
    this._onPressItem = this._onPressItem.bind(this)
    this._onLongPressItem = this._onLongPressItem.bind(this)
    this._onLayout = this._onLayout.bind(this)
  }

  get selectedItemsKeys () {
    return this.state.selectedItemsKeys
  }

  deselectAll () {
    this.setState({selectedItemsKeys: []})
  }

  _renderEmptyView () {
    return (
      <View style={[styles.emptyView, {width: this.state.width, height: this.state.height}]}>
        {this.props.ListEmptyComponent()}
      </View>
    )
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

  _onLayout (event) {
    const {width, height} = event.nativeEvent.layout

    this.setState({width, height})
  }

  componentWillUpdate () {
    LayoutAnimation.configureNext(animationConfig)
  }

  render () {
    return (
      <FlatList
        keyExtractor={(item, index) => index}
        data={this.props.items}
        extraData={this.state}
        keyboardShouldPersistTaps={'handled'}
        onLayout={this._onLayout}
        renderItem={this._renderItem}
        ListEmptyComponent={this._renderEmptyView}
        contentContainerStyle={this.props.items.length ? styles.flatListContent : {padding: 0}}
        style={styles.flatList}/>
    )
  }
}

