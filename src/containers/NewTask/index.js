import React from 'react'
import { Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import styles from './styles'
import { COLOR_HUE, COLOR_SATURATION, MAX_COLOR_LIGHTNESS } from '../Tasks/index'
import { connect } from 'react-redux'
import { createTask } from '../../redux/actions/dataActions'
import { goBack } from '../../redux/actions/navigationActions'
import Constants from '../../utils/Constants'

const TEXT_INPUT_MAX_LENGTH = 150

@connect(
  null,
  (dispatch) => ({
    onPressActionSend: (text) => {
      dispatch(createTask(text))
      dispatch(goBack())
    }
  })
)
export default class NewTask extends React.PureComponent {

  state = {text: ''}

  constructor (props) {
    super(props)

    this._onChangeText = this._onChangeText.bind(this)
    this._onPressSend = this._onPressSend.bind(this)
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
        <TextInput
          autoFocus={true}
          selectionColor={Constants.color.SELECTION}
          placeholderTextColor={Constants.color.SELECTION}
          multiline
          maxLength={TEXT_INPUT_MAX_LENGTH}
          value={this.state.text}
          onChangeText={this._onChangeText}
          placeholder={'What would you like to do?'}
          autoCapitalize={'sentences'}
          underlineColorAndroid={Constants.color.TRANSPARENT}
          style={styles.textInput}/>
        <View style={styles.keyboardToolbar}>
          <Text style={styles.textLength}>
            {TEXT_INPUT_MAX_LENGTH - this.state.text.length}
          </Text>
          <TouchableNativeFeedback
            delayPressIn={0}
            disabled={!this.state.text.trim()}
            background={TouchableNativeFeedback.Ripple(Constants.color.RIPPLE, false)}
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

