import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    parentView: {
        flexGrow: 1,
        justifyContent: 'center',
    },
    parentViewFlex: {
        flex: 1,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        margin: 10
    },
    formComponent: {
        marginBottom: 15,
        marginTop: 15
    },
    buttonStyle: {
        marginBottom: 10,
        height: 54
    },
    logoutButtonStyle: {
        marginTop: 20,
        height: 54,
        backgroundColor: '#ff3b30'
    },
    header: {
        color: '#000',
        fontSize: 20
    },
    headerContainer: {
        borderBottomColor: '#bbb'
    },
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    },
    barContainer: {
        marginTop: 10,
        marginBottom: 10
    },
    progressBarHeight: {
        transform: [{ scaleY: 2.0 }],
        flex: 1,
        alignSelf: 'center',
        marginBottom: 30
    },
    sliderBar: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    progressBar: {
        justifyContent: 'space-around',
        alignContent: 'center',
        flexDirection: 'row',

    },
    barColors: {
        color: '#0cd1e8',

    },
    barLabel: {
        margin: 10,
        marginBottom: 20,
        marginTop: 20
    },
    barText: {
        margin: 10
    },
    sliderThumbStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        backgroundColor: '#fff'
    },
    label: {
        fontSize: 16,
        color: '#86939e',
        fontWeight: 'bold',
    },
    // Picker Styles
    pickerContainer: {
        margin: 10,
    },
    inputIOS: {
        fontSize: 16,
        paddingVertical: 12,
        paddingHorizontal: 10,
        borderBottomColor: '#86939e',
        borderBottomWidth: 1,
        color: 'black',
        paddingRight: 30,
    },
    iconContainer: {
        top: 10,
        right: 12,
    },
    pickerInputAccessory: {
        justifyContent: "center", 
        height: 30, 
        width: 200, 
        borderColor: '#bdc6cf',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: 'white',
        paddingLeft: 10
    },
    bottomBorder: {
        borderBottomColor: '#86939e',
        borderBottomWidth: 1,
        marginBottom: 15,
        paddingBottom: 20
    }
});

export default styles;