import React from 'react'
import { LayoutAnimation, NativeModules, StatusBar, Text, TextInput, TouchableNativeFeedback, View } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

const {UIManager} = NativeModules

const MAX_COLOR_LIGHTNESS = 75
const MIN_COLOR_LIGHTNESS = 25
const COLOR_HUE = 25
const COLOR_SATURATION = 80

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

export default class NewTask extends React.PureComponent {

  state = {text: ''}

  componentWillUpdate () {
    LayoutAnimation.configureNext(animationConfig)
  }

  render () {
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor={'#000'}
          barStyle="light-content"/>
        <Icon.ToolbarAndroid
          style={styles.toolbar}
          navIconName={'close'}
          onIconClicked={this.props.onPressNavIcon}
          titleColor={'#ffffff'}/>
        <TextInput
          style={styles.textInput}
          autoFocus={true}
          selectionColor={'#909090'}
          placeholderTextColor={'#909090'}
          multiline
          maxLength={150}
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
          placeholder={'What would you like to do?'}
          autoCapitalize={'sentences'}
          underlineColorAndroid={'#00000000'}/>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 16,
            paddingRight: 16,
            backgroundColor: '#212121',
            elevation: 4
          }}>
          <View style={{flex: 1}}>

          </View>
          <Text
            style={{fontSize: 12, color: '#FFF', marginLeft: 16, marginRight: 16}}>{150 - this.state.text.length}</Text>
          <TouchableNativeFeedback
            delayPressIn={0}
            disabled={Boolean(!this.state.text.trim())}
            background={TouchableNativeFeedback.Ripple('#e5e5e5', false)}
            onPress={() => this.props.onPressActionSend(this.state.text)}>
            <View style={{
              borderRadius: 2,
              paddingRight: 12,
              paddingBottom: 8,
              paddingLeft: 12,
              paddingTop: 8,
              backgroundColor: this.state.text.trim()
                ? `hsl(${COLOR_HUE}, ${COLOR_SATURATION}%, ${MAX_COLOR_LIGHTNESS}%)`
                : `hsl(${COLOR_HUE}, ${20}%, ${MAX_COLOR_LIGHTNESS}%)`
            }}>
              <Text style={{
                fontWeight: '500',
                color: '#212121',
                textAlignVertical: 'center',
                textAlign: 'center'
              }}>{'SEND'}</Text>
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
}

