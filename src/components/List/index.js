import React from 'react'
import { FlatList, LayoutAnimation, NativeModules, View } from 'react-native'
import styles from './styles'

NativeModules.UIManager.setLayoutAnimationEnabledExperimental &&
NativeModules.UIManager.setLayoutAnimationEnabledExperimental(true)

const animationConfig = {
  duration: 70,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity,
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut,
  },
}

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

  componentWillUpdate () {
    LayoutAnimation.configureNext(animationConfig)
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

