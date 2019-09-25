import React, { Component } from 'react';
import { View, SafeAreaView, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { Header, Button } from 'react-native-elements';
import LoadingIndicator from '../components/LoadingIndicator';
import { addTask, deleteTask, editTask, errorDisplayed, batchDeleteTasks } from '../actions/todoManagement/tasks';
import { addList, deleteList, editList } from '../actions/todoManagement/taskLists';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../components/utils/globalStyles';
import Accordion from '../components/Accordion/Accordion';
import InputDialog from '../components/InputDialog';

class TaskListsScreen extends Component {
    static navigationOptions = () => ({
        title: 'Task Lists'
    });

    constructor(props) {
        super(props);
        this.state = {
            isDialogVisible: false, 
            newListValue: ''
        }
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

    /**
     * Renders the dialog for creating new lists
     */
    renderNewListInputDialog = () => {
        return <InputDialog
            title='Create New List'
            inputs={{ listTitle: this.state.newListValue }}
            isVisible={this.state.isDialogVisible}
            onSaveFunc={() => {
                this.props.addList({ title: this.state.newListValue });
                this.setState({ isDialogVisible: false, newListValue: '' });
            }}
            onChangeFunc={(field, newInput) => {
                this.setState({ newListValue: newInput })
            }}
            onCancelFunc={() => {
                this.setState({ newListValue: '', isDialogVisible: false });
            }}
        />
    }

    render() {
        const { listItems, listDetails, listIds, editList, deleteList, batchDeleteTasks, listsLoading, tasksLoading } = this.props
        return (
            listsLoading || tasksLoading? (
                <LoadingIndicator />
            ) :
                <>
                    <Header
                        centerComponent={{ text: 'Task Lists', style: styles.header }}
                        backgroundColor="white"
                        containerStyle={styles.headerContainer}
                        statusBarProps={{ barStyle: 'dark-content' }}
                        rightComponent={
                            <Button
                                type='clear'
                                icon={
                                    <Icon
                                        name='ios-add'
                                        size={35}
                                        color='#007aff'
                                    />
                                }
                                containerStyle={{marginRight: 3}}
                                onPress={()=>{this.setState({isDialogVisible: true})}}
                            />
                        }
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
                                        onListDelete={() => { deleteList(id) }}
                                        onListItemsDelete={() => { batchDeleteTasks(id) }}
                                        noItemsText='No Tasks'
                                        navigation={this.props.navigation}
                                        listId={id}
                                        key={key}
                                    />
                                })
                            }
                        </SafeAreaView>
                    </ScrollView>
                    {this.renderNewListInputDialog()}
                </>
        );
    }
}

const mapStateToProps = ({ tasks: { taskOperationLoading, taskOperationError, tasks }, taskLists: { listOperationLoading, listOperationError, taskLists } }) => ({
    listsLoading: listOperationLoading,
    tasksLoading: taskOperationLoading,
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
    deleteList,
    batchDeleteTasks
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskListsScreen);