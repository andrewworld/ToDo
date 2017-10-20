import React, { PureComponent } from 'react'
import { Platform, TouchableNativeFeedback, TouchableOpacity, View, } from 'react-native'

export default class TouchableView extends PureComponent {

  static defaultProps = {
    borderless: false,
    rippleColor: 'rgba(0, 0, 0, .32)',
    onPress: () => {}
  }

  render () {
    if (Platform.OS === 'android') {
      const {style, ...rest} = this.props
      return (
        <TouchableNativeFeedback
          {...rest}
          background={
            Platform.Version >= 21
              ? TouchableNativeFeedback.Ripple(this.props.rippleColor, this.props.borderless)
              : TouchableNativeFeedback.SelectableBackground()
          }>
          <View style={style}>
            {this.props.children}
          </View>
        </TouchableNativeFeedback>
      )
    }

    return (
      <TouchableOpacity {...this.props}>
        {this.props.children}
      </TouchableOpacity>
    )
  }
}
