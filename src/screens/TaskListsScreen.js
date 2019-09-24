import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import LoadingIndicator from '../components/LoadingIndicator';
import { addTask, deleteTask, editTask, errorDisplayed } from '../actions/todoManagement/tasks';
import { addList, deleteList, editList } from '../actions/todoManagement/taskLists';
import styles from '../components/utils/globalStyles';
import Accordion from '../components/Accordion/Accordion'

class TaskListsScreen extends Component {
    static navigationOptions = () => ({
        title: 'Task Lists'
    });

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
        const { listItems, listDetails, listIds, editList, deleteList } = this.props
        return (
            this.props.loading ? (
                <LoadingIndicator />
            ) :
                <>
                    <Header
                        centerComponent={{ text: 'Task Lists', style: styles.header }}
                        backgroundColor="white"
                        containerStyle={styles.headerContainer}
                        statusBarProps={{ barStyle: 'dark-content' }}
                    />
                    <ScrollView
                        contentContainerStyle={styles.parentView}
                    >
                        <SafeAreaView style={styles.parentViewFlex}>

                            <Accordion
                                title="All Tasks"
                                items={Object.values(this.props.tasks)}
                                expanded={false}
                                options='deleteItemsOnly'
                                onTitleEdit={() => { console.log("title edited") }}
                                onListDelete={() => { console.log("list deleted") }}
                                onListItemsDelete={() => { console.log("title edited") }}
                                noItemsText='No Tasks'
                                navigation={this.props.navigation}
                            />
                            {!listIds.length ? null :
                                listIds.map((id, key) => {
                                    return <Accordion
                                        title={listDetails[id].title}
                                        items={listItems[id]}
                                        expanded={false}
                                        options='all'
                                        onTitleEdit={(listId, list) => { editList(listId, list) }}
                                        onListDelete={() => { deleteList(listId) }}
                                        onListItemsDelete={() => { console.log("title edited") }}
                                        noItemsText='No Tasks'
                                        navigation={this.props.navigation}
                                        key={key}
                                    />
                                })
                            }
                        </SafeAreaView>
                    </ScrollView>
                </>
        );
    }
}

const mapStateToProps = ({ tasks: { taskOperationLoading, taskOperationError, tasks }, taskLists: { listOperationError, taskLists } }) => ({
    loading: taskOperationLoading,
    taskError: taskOperationError,
    tasks: tasks.byId,
    taskIds: tasks.allIds,
    listItems: Object.values(taskLists.byId).reduce((object, list) => {
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