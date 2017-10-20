import { StyleSheet } from 'react-native'
import Constants from '../../utils/Constants'

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Constants.color.PRIMARY
  },
  toolbar: {
    elevation: 4,
    height: 56,
    backgroundColor: Constants.color.PRIMARY_DARK
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
    color: Constants.color.WHITE
  },
  itemIcon: {
    color: Constants.color.WHITE,
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
    borderColor: Constants.color.WHITE
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