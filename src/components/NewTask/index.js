import React from 'react'
import { LayoutAnimation, NativeModules, StatusBar, TextInput, View } from 'react-native'
import styles from './styles'
import Icon from 'react-native-vector-icons/MaterialIcons'

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
          actions={[{title: 'Send', iconName: 'send', show: 'always'}]}
          onActionSelected={() => this.props.onPressActionSend(this.state.text)}
          titleColor={'#ffffff'}/>
        <TextInput
          style={styles.textInput}
          autoFocus={true}
          selectionColor={'#909090'}
          placeholderTextColor={'#909090'}
          multiline
          value={this.state.text}
          onChangeText={(text) => this.setState({text})}
          placeholder={'What do you want to do?'}
          autoCapitalize={'sentences'}
          underlineColorAndroid={'#00000000'}/>
      </View>
    )
  }
}

