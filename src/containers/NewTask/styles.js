import { StyleSheet } from 'react-native'
import Constants from '../../utils/Constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.color.PRIMARY
  },
  textInput: {
    includeFontPadding: false,
    textAlignVertical: 'top',
    flex: 1,
    margin: 0,
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 24,
    color: Constants.color.WHITE
  },
  keyboardToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: Constants.color.PRIMARY_DARK,
    elevation: 4
  },
  textLength: {
    fontSize: 12,
    color: Constants.color.WHITE,
    marginLeft: 16,
    marginRight: 16
  },
  sendButtonContainer: {
    borderRadius: 2,
    paddingRight: 12,
    paddingBottom: 8,
    paddingLeft: 12,
    paddingTop: 8,
  },
  sendButtonText: {
    fontWeight: '500',
    color: Constants.color.PRIMARY_DARK,
    textAlignVertical: 'center',
    textAlign: 'center'
  }
})