import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  },
  toolbar: {
    height: 56,
    backgroundColor: '#303030'
  },
  textInput: {
    includeFontPadding: false,
    textAlignVertical: 'top',
    flex: 1,
    margin: 0,
    paddingLeft: 24,
    paddingRight: 24,
    fontSize: 24,
    color: '#ffffff'
  },
  keyboardToolbar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    backgroundColor: '#212121',
    elevation: 4
  },
  textLength: {
    fontSize: 12,
    color: '#FFF',
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
    color: '#212121',
    textAlignVertical: 'center',
    textAlign: 'center'
  }
})