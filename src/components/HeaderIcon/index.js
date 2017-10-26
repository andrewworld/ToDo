import React, { Component } from 'react'
import Icon from 'react-native-vector-icons/MaterialIcons'
import TouchableView from '../TouchableItem'
import styles from './styles'

export default class HeaderIcon extends Component {

  static defaultProps = {
    icon: 'arrow-back',
    iconStyle: {},
    onPress: () => {}
  }

  render () {
    return (
      <TouchableView
        delayPressIn={0}
        borderless={true}
        onPress={this.props.onPress}
        style={styles.iconContainer}>
        <Icon name={this.props.icon} style={[styles.icon, this.props.iconStyle]}/>
      </TouchableView>
    )
  }
}