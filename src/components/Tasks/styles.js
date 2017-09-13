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
  flatListContent: {
    padding: 8
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