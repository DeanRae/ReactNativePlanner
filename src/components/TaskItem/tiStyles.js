import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    itemContainer: {
        padding: 20, 
        backgroundColor: 'white', 
        borderBottomWidth: 1, 
        borderBottomColor: '#e8ecf0', 
      },
      itemDateText: {
        color: '#86939e'
      },
      itemDurationText: {
        color: 'grey', 
        fontSize: 12, 
        marginTop: 4,
        marginLeft: 4
      },
      itemTitleText: {
        color: 'black', 
        fontWeight: 'bold', 
        fontSize: 35
      },
      itemHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      itemInfoText: {
          color: '#007aff'
      }
});
