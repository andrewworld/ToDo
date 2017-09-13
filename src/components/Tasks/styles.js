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
  flatList: {
    flex: 1
  },
  flatListContent: {
    padding: 16
  },
  item: {
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
  itemAloneBorder: {
    borderRadius: 2
  },
  itemFirstBorder: {
    borderTopLeftRadius: 2,
    borderTopRightRadius: 2
  },
  itemLastBorder: {
    borderBottomLeftRadius: 2,
    borderBottomRightRadius: 2
  },
  itemSelectedBorder: {
    borderWidth: 3.5,
    borderColor: '#ffffff'
  },
  emptyViewContainer: {
    flex: 1,
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