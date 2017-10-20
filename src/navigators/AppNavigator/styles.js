import { StyleSheet } from 'react-native'
import Constants from '../../utils/Constants'

export default StyleSheet.create({
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  icon: {
    color: Constants.color.WHITE
  },
  counter: {
    fontSize: 22,
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontFamily: 'sans-serif-medium',
    color: Constants.color.WHITE
  }
})