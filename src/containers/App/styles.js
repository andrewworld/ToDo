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
  footer: {
    height: 8
  },
  header: {
    marginLeft: 8,
    marginRight: 8,
    padding: 18,
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
    margin: 0,
    padding: 0
  },
  item: {
    marginLeft: 8,
    marginRight: 8,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemTitle: {
    flex: 1,
    fontSize: 18,
    color: '#FFFFFF'
  },
  itemIcon: {
    color: '#ffffff',
    marginRight: 20
  },
  emptyViewContainer: {
    flex: 1,
    marginTop: 144,
    justifyContent: 'center',
    alignItems: 'center'
  },
  emptyViewText: {
    fontSize: 24,
    includeFontPadding: false,
    textAlignVertical: 'center',
    fontWeight: 'bold'
  }
})