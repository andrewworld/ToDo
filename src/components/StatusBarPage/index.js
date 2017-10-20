import React, { PureComponent } from 'react'
import { StatusBar, View } from 'react-native'
import Constants from '../../utils/Constants'
import styles from './styles'

export default class StatusBarPage extends PureComponent {

  static defaultProps = {
    contentClip: true,
    contentClipColor: Constants.color.TRANSPARENT,
    contentClipElevation: 0,
    barColor: Constants.color.SEMITRANSPARENT,
    barStyle: 'light-content',
    style: {}
  }

  render () {
    return (
      <View style={this.props.style}>
        <StatusBar
          translucent={true}
          backgroundColor={this.props.barColor}
          barStyle={this.props.barStyle}/>
        {this.props.contentClip
          ? (
            <View
              elevation={this.props.contentClipElevation}
              style={[styles.statusBarClip, {backgroundColor: this.props.contentClipColor}]}/>
          ) : null}
        {this.props.children}
      </View>
    )
  }
}
