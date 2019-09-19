import React, { Component } from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { Calendar, CalendarList, Agenda } from 'react-native-calendars';
import { Header } from 'react-native-elements';
import LoadingIndicator from '../components/LoadingIndicator';
import { getAllTasks, addTask, deleteTask, editTask, errorDisplayed } from '../actions/todoManagement/tasks';
import styles from '../components/utils/globalStyles';

class TaskDetailsScreen extends Component {
    static navigationOptions = () => ({
        title: 'Task Detail',
    });

    componentDidUpdate = (prevProps) => {

        if (this.props.error) {
            Alert.alert(
                'Error',
                this.props.error,
            );

            this.props.errorDisplayed();
        }
    }

    render() {
        return (
            <View >
                <Header
                    centerComponent={{ text: '', style: styles.header }}
                    backgroundColor="white"
                    containerStyle={styles.headerContainer}
                    statusBarProps={{ barStyle: 'dark-content' }}
                />
                {this.props.loading ? (
                    <LoadingIndicator />
                ) : null
                }
            </View>
        );
    }
}

const mapStateToProps = ({ tasks: { taskOperationLoading, taskOperationError, tasks } }) => ({
    loading: taskOperationLoading,
    error: taskOperationError,
    tasks: tasks.byId,
    taskIds: tasks.allIds
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
)(TaskDetailsScreen);