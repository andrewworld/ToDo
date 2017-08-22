import { StyleSheet } from 'react-native'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#303030'
  },
  toolbarDefault: {
    height: 56,
    backgroundColor: '#303030'
  },
  toolbarSelectionMode: {
    elevation: 4,
    height: 56,
    backgroundColor: '#212121'
  },
  flatListContent: {
    padding: 8
  },
  header: {
    padding: 16,
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  headerText: {
    marginLeft: 12,
    marginRight: 12,
    fontSize: 18,
  },
  headerTextInput: {
    flex: 1,
    fontSize: 18,
    margin: 0,
    padding: 0
  },
  headerIcon: {
    padding: 4
  },
  item: {
    padding: 20,
    margin: 8,
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
    paddingTop: 144,
    paddingBottom: 144,
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