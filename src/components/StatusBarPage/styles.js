import { Platform, StatusBar, StyleSheet } from 'react-native'

export default StyleSheet.create({
  statusBarClip: {
    display: Platform.Version >= 21 ? 'flex' : 'none',
    height: StatusBar.currentHeight
  }
})