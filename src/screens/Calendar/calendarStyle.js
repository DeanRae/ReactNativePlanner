const calStyles = {
    calendar: {
      paddingLeft: 20, 
      paddingRight: 20
    },
    section: {
      backgroundColor: '#f0f4f7', 
      color: '#79838a'
    },
    item: {
      padding: 20, 
      backgroundColor: 'white', 
      borderBottomWidth: 1, 
      borderBottomColor: '#e8ecf0', 
      flexDirection: 'row'
    },
    itemHourText: {
      color: 'black'
    },
    itemDurationText: {
      color: 'grey', 
      fontSize: 12, 
      marginTop: 4,
      marginLeft: 4
    },
    itemTitleText: {
      color: 'black', 
      marginLeft: 16, 
      fontWeight: 'bold', 
      fontSize: 16
    },
    itemButtonContainer: {
      flex: 1, 
      alignItems: 'flex-end'
    },
    emptyItem: {
      paddingLeft: 20,
      height: 52, 
      justifyContent: 'center',
      borderBottomWidth: 1, 
      borderBottomColor: '#e8ecf0' 
    },
    emptyItemText: {
      color: '#79838a',
      fontSize: 14
    }
  };

export default calStyles;