import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
    modalContainer: {
        height: 310,
        backgroundColor:'white',
        alignSelf: 'stretch'
    },
    modalHeader: {
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        backgroundColor: '#EFF1F2',
        borderTopWidth: 0.5,
        borderTopColor: '#919498',
        zIndex: 2,
    },
    modalHeaderContainer: {
        flex: 1,
    },
    timeLabelContainer: {
        backgroundColor: '#EFF1F2',
        borderWidth: 0.5,
        borderColor: '#919498',
        height: 44,
        width: 200,
        margin: 20,
        marginLeft: 30,
        justifyContent: 'center',
        paddingLeft: 10,
        flexDirection: 'row',
        alignItems: 'center'
    },
    timeText: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    timeArrowIcon: {
        paddingLeft: 10
    },
    pickerButton: {
        margin: 10,
        paddingBottom: 12,  
        borderBottomColor: '#86939e',
        borderBottomWidth: 1,
        paddingRight: 30,
    }, 
    pickerButtonText: {
        fontSize: 16,
        paddingLeft: 10
    },
    pickerLabel: {
        fontSize: 16,
        color: '#86939e',
        fontWeight: 'bold',
        marginBottom: 10
    },

});