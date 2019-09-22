import React, { Component } from 'react';
import { SafeAreaView, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import LoadingIndicator from '../components/LoadingIndicator';
import { getAllTasks, addTask, deleteTask, editTask, errorDisplayed } from '../actions/todoManagement/tasks';
import { addList } from '../actions/todoManagement/taskLists';
import styles from '../components/utils/globalStyles';
import { createTitleFromFieldName } from '../components/utils/textTransformations';
import ProgressBar from '../components/ProgressBar';
import Picker from '../components/Picker';
import DateTimePicker from '../components/DateTimePicker/DateTimePicker';
import getNZDateTime from '../components/utils/getNZDateTime';
import SubtaskContainer from '../components/Subtasks/SubtaskContainer';

const initState = {
    completionRate: 0,
    title: '',
    location: '',
    listId: '',
    newTaskList: '',
    taskListDialog: false,
    startDate: getNZDateTime(new Date()),
    endDate: getNZDateTime(new Date()),
    description: '',
    subtasks: [],
    isCompleted: false
}
class TaskDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        const routeName = navigation.state.routeName;
        return {
            title: createTitleFromFieldName(routeName),
        }
    };

    constructor(props) {
        super(props);

        const params = this.getNavParams(props.navigation);

        this.state = {
            ...initState
        }

        console.log("the state", this.state);
    }

    componentDidUpdate = (prevProps) => {
        console.log("state", this.state);
        if (this.props.taskError || this.props.listError) {
            Alert.alert(
                'Error',
                this.props.taskError ? this.props.taskError : this.prevProps.listError,
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

    inputAccessoryView = () => {
        return (
            <View style={defaultStyles.modalViewMiddle}>
                <Text>Select A Task List</Text>
                <TouchableOpacity
                    onPress={() => {
                        console.log("add new list pressed");
                    }}
                    hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                    <View>
                        <Text style={defaultStyles.done}>Add New List</Text>
                    </View>
                </TouchableOpacity>
            </View>
        );
    }

    renderTaskListPicker = (isDisabled) => {
        return (
            <View>
                <Picker
                    placeholder={{ label: 'Select a task list...', value: '' }}
                    label='List'
                    value={this.state.listId}
                    onChangeFunc={(value) => {
                        this.setState({ ["listId"]: value });
                    }}
                    inputAccessoryLabel='Select A Task List'
                    buttonName='Add New Task List'
                    buttonFunc={(list) => { this.props.addList(list) }}
                    options={this.props.lists}
                    disabled={isDisabled}
                />
            </View>
        );
    }

    renderDatePickers = (isDisabled) => {
        return (
            <>
                <DateTimePicker currentDate={this.state.startDate} onDayPress={(date) => { this.setState({ startDate: date }) }}
                    onTimeConfirm={(date) => { this.setState({ startDate: date }) }}
                    label="Start Date and Time"
                    disabled = {isDisabled}
                />
                <DateTimePicker currentDate={this.state.endDate} onDayPress={(date) => { this.setState({ endDate: date }) }}
                    onTimeConfirm={(date) => { this.setState({ endDate: date }) }}
                    label="End Date and Time"
                    disabled = {isDisabled}
                />
            </>
        );
    }

    extractTaskValues = () => {
        return {
            title: this.state.title,
            description: this.state.description,
            location: this.state.location,
            listId: this.state.listId,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            completionRate: this.state.completionRate,
            isCompleted: this.state.isCompleted,
            subtasks: this.state.subtasks
        };
    }

    // renderTaskDetailButtons = () => {
    //     const {isCompleted} = this.state;
    //     <View>
    //         <Button 
    //             title={isCompleted? 'COMPLETE' : 'DELETE'}
    //             color={isCompleted? '#4cd964':'#ff3b30'}
    //             onPress={() => {
    //                 this.props.editTask({...this.extractTaskValues(), isCompleted: true});
    //                 this.navigation.goBack();
    //         } : ()
    //     }
    //         />
    //     </View>

    // }

    render() {
        const { navigation } = this.props;
        const taskId = navigation.getParam('id', '');
        const isEdit = navigation.getParam('isEdit', false);
        const { routeName } = navigation.state;
        console.log("ro", routeName);
        return (
            this.props.loading ? (
                <LoadingIndicator />
            ) :

                <KeyboardAwareScrollView
                    contentContainerStyle={styles.parentView}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                >
                    <SafeAreaView style={styles.centered}>
                        <Input
                            label='Title *'
                            containerStyle={styles.formComponent}
                            onChangeText={newInput => {
                                this.setState({ title: newInput })
                            }}
                            autoFocus={routeName != 'TaskDetails'}
                            editable={routeName != 'TaskDetails'}
                        />

                        <Input
                            label='Location'
                            containerStyle={styles.formComponent}
                            onChangeText={newInput => {
                                this.setState({ location: newInput })
                            }}
                            editable={routeName != 'TaskDetails'}
                        />

                        {this.renderTaskListPicker(routeName == 'TaskDetails')}

                        <ProgressBar
                            disabled={routeName == 'TaskDetails'}
                            value={this.state.completionRate}
                            onChangeFunc={(val) => { this.setState({ completionRate: val }) }}
                        />

                        {this.renderDatePickers(routeName == 'TaskDetails')}

                        <Input
                            label='Description'
                            multiline
                            onChangeText={text => { this.setState({ description: text }) }}
                            value={this.state.description}
                            containerStyle={styles.formComponent}
                            editable={routeName != 'TaskDetails'}
                        />
                        <SubtaskContainer
                            subtasks={this.state.subtasks}
                            onAdd={(subtask) => {
                                this.setState({ subtasks: [...this.state.subtasks, subtask] })
                            }}
                            onEdit={(index, subtask) => {
                                this.setState({
                                    subtasks: this.state.subtasks.map((item, i) => {
                                        return i == index ? subtask : item
                                    })
                                })
                            }}
                            onDelete={(index) => {
                                this.setState({
                                    subtasks: this.state.subtasks.filter((item, i) => i != index)
                                })
                            }}

                            disabled={routeName == 'TaskDetails'}
                        />

                        <Button
                            title="Save"
                            onPress={() => {
                                this.props.addTask({
                                    title: this.state.title,
                                    description: this.state.description,
                                    location: this.state.location,
                                    listId: this.state.listId,
                                    startDate: this.state.startDate,
                                    endDate: this.state.endDate,
                                    completionRate: this.state.completionRate,
                                    isCompleted: this.state.isCompleted,
                                    subtasks: this.state.subtasks
                                })
                            }}
                        />
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

const mapStateToProps = ({ tasks: { taskOperationLoading, taskOperationError, tasks }, taskLists: { listOperationError, taskLists } }) => ({
    loading: taskOperationLoading,
    taskError: taskOperationError,
    tasks: tasks.byId,
    taskIds: tasks.allIds,
    lists: Object.values(taskLists.byId).map((value) => ({ label: value.title, value: value.id })),
    listIds: taskLists.allIds,
    listError: listOperationError
});

const mapDispatchToProps = {
    getAllTasks,
    addTask,
    deleteTask,
    editTask,
    errorDisplayed,
    addList
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailsScreen);