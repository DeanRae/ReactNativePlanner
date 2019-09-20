import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    parentView: {
        flexGrow: 1,
        justifyContent: 'center',

    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        margin: 10
    },
    formComponent: {
        marginBottom: 30,
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
        fontWeight: 'bold',
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

});

export default styles;