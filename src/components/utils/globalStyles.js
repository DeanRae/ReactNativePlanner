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
    }
});

export default styles;