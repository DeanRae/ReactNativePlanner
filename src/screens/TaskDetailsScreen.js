import React, { Component } from 'react';
import { SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Header, Button } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingIndicator from '../components/LoadingIndicator';
import { getAllTasks, addTask, deleteTask, editTask, errorDisplayed } from '../actions/todoManagement/tasks';
import styles from '../components/utils/globalStyles';
import { createTitleFromFieldName } from '../components/utils/textTransformations';

class TaskDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const routeName = navigation.state.routeName;
        return {
            title: createTitleFromFieldName(routeName),
        }
    };

    componentDidUpdate = (prevProps) => {

        if (this.props.error) {
            Alert.alert(
                'Error',
                this.props.error,
            );

            this.props.errorDisplayed();
        }
    }

    getNavParams = (navigation) => {
        return {
            taskId: navigation.getParam('id', ''),
            isEdit: navigation.getParam('isEdit', false)
        };
    }

    getHeaderTitle = () => {
        const { navigation } = this.props;
        const params = this.getNavParams(navigation);

        if (params.taskId && params.isEdit) {
            return 'Edit Task';
        } else if (params.taskId && !params.isEdit) {
            return 'Task Details';
        } else {
            return 'Create Task';
        }

    }

    render() {
        const { navigation } = this.props;
        const taskId = navigation.getParam('id', '');
        const isEdit = navigation.getParam('isEdit', false);
        return (
            this.props.loading ? (
                <LoadingIndicator />
            ) :

                <KeyboardAwareScrollView
                    contentContainerStyle={styles.parentView}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                >
                    <SafeAreaView style={styles.centered}>

                    </SafeAreaView>
                </KeyboardAwareScrollView>


        );
    }
}

{/* <Button title="Edit" onPress={() => {
                    navigation.navigate('EditTask', {
                        id: '86',
                        isEdit: true,
                    });
                }} /> */}

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