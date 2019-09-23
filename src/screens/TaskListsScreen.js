import React, { Component } from 'react';
import { View, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import LoadingIndicator from '../components/LoadingIndicator';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { addTask, deleteTask, editTask, errorDisplayed } from '../actions/todoManagement/tasks';
import { addList, deleteList, editList } from '../actions/todoManagement/taskLists';
import styles from '../components/utils/globalStyles';
import Accordion from '../components/Accordion/Accordion'

class TaskListsScreen extends Component {
    static navigationOptions = () => ({
        title: 'Task Lists'
    });

    componentDidMount = () => {
        console.log("pros", this.props)
    }
    componentDidUpdate = (prevProps) => {

        if (this.props.taskError || this.props.listError) {
            Alert.alert(
                'Error',
                this.props.taskError ? this.props.taskError : this.prevProps.listError,
            );

            this.props.errorDisplayed();
        }
    }

    render() {
        return (
            this.props.loading ? (
                <LoadingIndicator />
            ) :
                <KeyboardAwareScrollView
                    contentContainerStyle={styles.parentView}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                >
                    <Header
                        centerComponent={{ text: 'Task Lists', style: styles.header }}
                        backgroundColor="white"
                        containerStyle={styles.headerContainer}
                        statusBarProps={{ barStyle: 'dark-content' }}
                    />
                    <SafeAreaView style={styles.parentViewFlex}>

                        <Accordion
                            title="All Tasks"
                            items={Object.values(this.props.tasks)}
                            hasOptions={true}
                            onTitleEdit={() => { console.log("title edited") }}
                            onListDelete={() => { console.log("list deleted") }}
                            onListItemsDelete={() => { console.log("title edited") }}
                            navigation={this.props.navigation}
                        />
                    </SafeAreaView>
                </KeyboardAwareScrollView>
        );
    }
}

const mapStateToProps = ({ tasks: { taskOperationLoading, taskOperationError, tasks }, taskLists: { listOperationError, taskLists } }) => ({
    loading: taskOperationLoading,
    taskError: taskOperationError,
    tasks: tasks.byId,
    taskIds: tasks.allIds,
    lists: Object.values(taskLists.byId).reduce((object, list) => {
        object[list.id] = Object.values(tasks.byId).filter(task => task.listId == list.id);
        return object;
    }, {}),
    listDetails: taskLists.byId,
    listIds: taskLists.allIds,
    listError: listOperationError
});

const mapDispatchToProps = {
    addTask,
    deleteTask,
    editTask,
    errorDisplayed,
    addList,
    editList,
    deleteList
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListsScreen);