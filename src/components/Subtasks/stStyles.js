import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    subtaskHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        justifyContent: 'space-between',
        margin: 10,
        borderBottomColor: '#86939e',
        borderBottomWidth: 1,
    },
    label: {
        fontSize: 20,
        color: '#86939e',
        fontWeight: 'bold',
    },
    subtaskContainer: {
        margin: 20,
    },
    noSubtasksText: {
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
        justifyContent: 'space-around',
        width: 100
    }
});