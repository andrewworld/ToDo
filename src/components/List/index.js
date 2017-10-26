import React from 'react'
import { FlatList, View } from 'react-native'
import styles from './styles'

export default class List extends React.PureComponent {

  static defaultProps = {
    keyExtractor: (item, index) => index
  }

  state = {
    width: 0,
    height: 0
  }

  constructor (props) {
    super(props)

    this._renderEmptyView = this._renderEmptyView.bind(this)
    this._onLayout = this._onLayout.bind(this)
  }

  _onLayout (event) {
    const {width, height} = event.nativeEvent.layout

    this.setState({width, height})
  }

  _renderEmptyView () {
    const {width, height} = this.state

    return (
      <View style={[styles.emptyView, {width, height}]}>
        {this.props.ListEmptyComponent()}
      </View>
    )
  }

  render () {
    return (
      <FlatList
        keyExtractor={this.props.keyExtractor}
        keyboardShouldPersistTaps={'handled'}
        data={this.props.data}
        extraData={this.props.extraData}
        onLayout={this._onLayout}
        renderItem={this.props.renderItem}
        ListEmptyComponent={this._renderEmptyView}
        contentContainerStyle={this.props.data.length ? styles.flatListContent : {padding: 0}}
        style={styles.flatList}/>
    )
  }
}

