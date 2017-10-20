import React from 'react'
import { LayoutAnimation, NativeModules, StatusBar, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { COLOR_HUE, COLOR_SATURATION, MAX_COLOR_LIGHTNESS } from '../Tasks/index'

const {UIManager} = NativeModules

UIManager.setLayoutAnimationEnabledExperimental &&
UIManager.setLayoutAnimationEnabledExperimental(true)

const animationConfig = {
  duration: 100,
  create: {
    type: LayoutAnimation.Types.easeInEaseOut,
    property: LayoutAnimation.Properties.opacity
  },
  update: {
    type: LayoutAnimation.Types.easeInEaseOut
  },
}

const TEXT_INPUT_MAX_LENGTH = 150

export default class NewTask extends React.PureComponent {

  state = {text: ''}

  constructor (props) {
    super(props)

    this._onChangeText = this._onChangeText.bind(this)
    this._onPressSend = this._onPressSend.bind(this)
  }

  componentWillUpdate () {
    LayoutAnimation.configureNext(animationConfig)
  }

  _onChangeText (text) {
    this.setState({text})
  }

  _onPressSend () {
    this.props.onPressActionSend(this.state.text)
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#000'}
          barStyle="light-content"/>
        <Icon.ToolbarAndroid
          navIconName={'close'}
          onIconClicked={this.props.onPressNavIcon}
          titleColor={'#ffffff'}
          style={styles.toolbar}/>
        <TextInput
          autoFocus={true}
          selectionColor={'#909090'}
          placeholderTextColor={'#909090'}
          multiline
          maxLength={TEXT_INPUT_MAX_LENGTH}
          value={this.state.text}
          onChangeText={this._onChangeText}
          placeholder={'What would you like to do?'}
          autoCapitalize={'sentences'}
          underlineColorAndroid={'#00000000'}
          style={styles.textInput}/>
        <View style={styles.keyboardToolbar}>
          <Text style={styles.textLength}>
            {TEXT_INPUT_MAX_LENGTH - this.state.text.length}
          </Text>
          <TouchableNativeFeedback
            delayPressIn={0}
            disabled={!this.state.text.trim()}
            background={TouchableNativeFeedback.Ripple('#e5e5e5', false)}
            onPress={this._onPressSend}>
            <View style={[styles.sendButtonContainer, {
              backgroundColor: this.state.text.trim()
                ? `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`
                : `hsl(${COLOR_HUE}, ${20}%, ${MAX_COLOR_LIGHTNESS}%)`
            }]}>
              <Text style={styles.sendButtonText}>
                {'SEND'}
              </Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

