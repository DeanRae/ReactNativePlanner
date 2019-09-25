import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    accordionContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-between',
        margin: 10,
        paddingHorizontal: 10,
        borderBottomColor: '#86939e',
        borderBottomWidth: 1,
    },
    expandedColor: {
        backgroundColor: '#cddae4', 
        color: '#79838a'
    },
    subListNotExpanded: {
        backgroundColor:'#f0f4f7',
        color: '#79838a'
    },
    subListExpanded: {
        backgroundColor: '#d9d9d9',
        color: '#79838a'
    },
    label: {
        fontSize: 20,
    },
    subtaskContainer: {
        margin: 20,
    },
    noItemsText: {
        color: '#9EA0A4',
        fontSize: 16,
        textAlign: 'center'
    },
    subtask: {
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    buttonContainer: {
        flexDirection: 'row',  
        alignItems: 'center',
        justifyContent: 'space-between',
        width: 70,
    }
});