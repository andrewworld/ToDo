import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  },
  toolbar: {
    elevation: 4,
    height: 56,
    backgroundColor: '#212121'
  },
  separator: {
    height: 8
  },
  header: {
    marginLeft: 8,
    marginRight: 8,
    padding: 12,
    marginTop: 8,
    justifyContent: 'center',
  },
  headerPlusText: {
    borderWidth: 2,
    width: 24,
    fontSize: 18,
    height: 24,
    textAlign: 'center',
    includeFontPadding: false,
    textAlignVertical: 'center',
    borderRadius: 24 / 2
  },
  headerText: {
    marginLeft: 12,
    marginRight: 12,
    fontSize: 18,
  },
  headerTextInput: {
    fontSize: 18,
    height: 48,
  },
  item: {
    marginLeft: 8,
    marginRight: 8,
    padding: 12,
    justifyContent: 'center'
  },
  itemTitle: {
    fontSize: 18,
    color: '#FFFFFF'
  },
  itemDescription: {
    fontSize: 16,
    color: '#FFFFFF'
  }
})