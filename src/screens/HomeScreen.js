import React, { Component } from 'react';
import { SafeAreaView, View, Alert, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { connect } from 'react-redux';
import { getAllTasks, addTask, deleteTask, editTask, errorDisplayed } from '../actions/todoManagement/tasks';
import { Text, Button, Header } from 'react-native-elements';
import styles from '../components/utils/globalStyles';

class HomeScreen extends Component {
    static navigationOptions = () => ({
        title: 'Home',
    });

    componentDidMount = () => {
        this.props.getAllTasks();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.error) {
            Alert.alert(
                'Error',
                this.props.error,
            );

            this.props.errorDisplayed();
        }
    }

    constructor() {
        super();

    }

    render() {
        const { user } = this.props;
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.parentView}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <Header
                    centerComponent={{ text: 'Home', style: styles.header }}
                    backgroundColor="white"
                    containerStyle={styles.headerContainer}
                    statusBarProps={{ barStyle: 'dark-content' }}
                />
                <SafeAreaView style={styles.centered}>
                    <Text h1>{`Welcome ${user.displayName ? user.displayName : ''}`}</Text>

                    {!this.props.taskIds.length ? (
                        <Text style={styles.centered}>No Tasks</Text>
                    ) : (
                            <Text style={styles.centered}>{this.props.taskIds}</Text>
                        )}
                </SafeAreaView>
            </KeyboardAwareScrollView>

        );
    }

}

const mapStateToProps = ({ tasks: { taskOperationLoading, taskOperationError, tasks }, auth: { user } }) => ({
    loading: taskOperationLoading,
    error: taskOperationError,
    tasks: tasks.byId,
    taskIds: tasks.allIds,
    user
});

const mapDispatchToProps = {
    getAllTasks,
    addTask,
    deleteTask,
    editTask,
    errorDisplayed
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);