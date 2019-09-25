import React, { Component } from 'react';
import { SafeAreaView, Text, View, ScrollView, ActionSheetIOS } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input, Header } from 'react-native-elements';
import LoadingIndicator from '../components/LoadingIndicator';
import { getAllTasks, addTask, deleteTask, editTask, errorDisplayed } from '../actions/todoManagement/tasks';
import { addList } from '../actions/todoManagement/taskLists';
import styles from '../components/utils/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
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
    isCompleted: false,
    finished: false
}
class TaskDetailsScreen extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            header: null
        }
    };

    constructor(props) {
        super(props);

        this.state = {
            ...initState
        }
    }

    componentDidMount = () => {
        const { navigation, tasks } = this.props;
        const taskId = navigation.getParam('id', '');
        const task = tasks[taskId];
        const { routeName } = navigation.state;

        if (routeName != 'CreateTask') {
            this.setState({
                ...this.state,
                ...this.getTaskValues(task)
            })
        }
    }

    getTaskValues = (task) => {
        return {
            completionRate: task.completionRate,
            title: task.title,
            location: task.location,
            listId: task.listId,
            startDate: task.startDate,
            endDate: task.endDate,
            description: task.description,
            subtasks: task.subtasks,
            isCompleted: task.isCompleted
        };
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.taskError || this.props.listError) {
            Alert.alert(
                'Error',
                this.props.taskError ? this.props.taskError : this.prevProps.listError,
            );

            this.props.errorDisplayed();
        }

        if (!(this.props.taskError || this.props.listError) && !this.props.loading && this.state.finished) {
            this.props.navigation.popToTop();
        }
    }

    getHeaderTitle = (routeName) => {
        switch (routeName) {
            case 'EditTask':
                return 'Edit Task';
            case 'TaskDetails':
                return 'Task Details';
            case 'CreateTask':
                return 'Create Task';
        }
    }

    renderTaskListPicker = (isDisabled) => {
        return (
            <View>
                <Picker
                    placeholder={{ label: !this.state.listId && isDisabled ? '' :'Select a task list...', value: '' }}
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
                    disabled={isDisabled}
                />
                <DateTimePicker currentDate={this.state.endDate} onDayPress={(date) => { this.setState({ endDate: date }) }}
                    onTimeConfirm={(date) => { this.setState({ endDate: date }) }}
                    label="End Date and Time"
                    disabled={isDisabled}
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

    getRightHeaderButton = (routeName, taskId) => {
        switch (routeName) {
            case 'CreateTask':
                return <Button title="Save" type="clear" onPress={() => {
                    this.setState({ finished: true });
                    this.props.addTask(this.extractTaskValues());
                }} />
            case 'EditTask':
                return <Button title="Save" type="clear" onPress={() => {
                    this.setState({ finished: true });
                    this.props.editTask(taskId, this.extractTaskValues());
                }} />
            case 'TaskDetails':
                return <Button
                    type="clear"
                    containerStyle={{ alignItems: 'flex-start', marginRight: 15 }}
                    icon={
                        <Icon
                            name="ios-more"
                            size={30}
                            color="#007aff"
                        />
                    }
                    onPress={() => { this.showActionSheet() }} />
        }
    }

    showActionSheet = () => {
        const { isCompleted } = this.state;
        const { navigation } = this.props;
        const taskId = navigation.getParam('id', '');
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Edit', isCompleted ? 'Reactivate Task' : 'Complete Task', 'Delete', 'Cancel'],
                destructiveButtonIndex: 2,
                cancelButtonIndex: 3,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    navigation.navigate("EditTask", { id: taskId });
                } else if (buttonIndex === 1) {
                    this.setState({ finished: true });
                    this.props.editTask(taskId, { isCompleted: isCompleted ? false : true });
                } else if (buttonIndex === 2) {
                    this.setState({ finished: true });
                    this.props.deleteTask(taskId);
                }
            }
        );
    }



    render() {
        const { navigation } = this.props;
        const taskId = navigation.getParam('id', '');
        const { routeName } = navigation.state;

        return (
            this.props.loading ? (
                <LoadingIndicator />
            ) :
                <>
                    <Header
                        centerComponent={{ text: this.getHeaderTitle(routeName), style: styles.header }}
                        leftComponent={
                            <Button
                                type="clear"
                                title="Back"
                                titleStyle={{ marginLeft: 5, fontSize: 20, fontWeight: 'bold' }}
                                containerStyle={{ alignItems: 'center' }}
                                icon={
                                    <Icon
                                        name="ios-arrow-back"
                                        size={30}
                                        color="#007aff"
                                    />
                                }
                                onPress={() => { navigation.goBack() }}
                            />
                        }
                        rightComponent={this.getRightHeaderButton(routeName, taskId)}
                        backgroundColor="white"
                        containerStyle={styles.headerContainer}
                        statusBarProps={{ barStyle: 'dark-content' }}
                    />
                    <ScrollView
                        contentContainerStyle={styles.parentView}
                    >

                        <SafeAreaView style={styles.centered}>
                            <Input
                                label='Title *'
                                value={this.state.title}
                                containerStyle={styles.formComponent}
                                onChangeText={newInput => {
                                    this.setState({ title: newInput })
                                }}
                                autoFocus={routeName != 'TaskDetails'}
                                editable={routeName != 'TaskDetails'}
                            />

                            <Input
                                label='Location'
                                value={this.state.location}
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
                                    this.setState({ finished: true });
                                    this.props.addTask(this.extractTaskValues());
                                }}
                            />
                        </SafeAreaView>
                    </ScrollView>
                </>

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