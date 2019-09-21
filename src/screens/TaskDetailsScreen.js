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

const initState = {
    completionRate: 0,
    title: '',
    location: '',
    taskList: '',
    newTaskList: '',
    taskListDialog: false,
    startDate: getNZDateTime(new Date()),
    endDate: getNZDateTime(new Date()),
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

        this.inputRefs = {
            firstTextInput: null,
            favSport0: null,
            favSport1: null,
            lastTextInput: null,
            favSport5: null,
        };

        this.state = {
            ...initState
        }

        console.log("the state", this.state);
    }

    componentDidUpdate = (prevProps) => {
        console.log("state", this.state);
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

    toggleTaskListInputDialog = () => {
        this.setState({ taskListDialog: !this.state.taskListDialog });
    }

    renderTaskListPickerAndDialog = () => {
        return (
            <View>
                <Picker
                    placeholder={{ label: 'Select a task list...', value: '' }}
                    label='List'
                    value={this.state.taskList}
                    onChangeFunc={(value) => {
                        this.setState({ ["taskList"]: value });
                    }}
                    inputAccessoryLabel='Select A Task List'
                    buttonName='Add New Task List'
                    buttonFunc={() => { this.toggleTaskListInputDialog() }}
                    options={[
                        { label: 'Football', value: 'football' },
                        { label: 'Baseball', value: 'baseball' },
                        { label: 'Hockey', value: 'hockey' },
                    ]}
                />

            </View>
        );
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
                        <Input
                            label='Title *'
                            containerStyle={styles.formComponent}
                            onChangeText={newInput => {
                                this.setState({ title: newInput })
                            }}
                        />
                        <Input
                            label='Location'
                            containerStyle={styles.formComponent}
                            onChangeText={newInput => {
                                this.setState({ location: newInput })
                            }}
                        />
                        {this.renderTaskListPickerAndDialog()}
                        <DateTimePicker currentDate={this.state.startDate} onDayPress={(date)=>{this.setState({startDate: date})}}
                        onTimeConfirm={(date)=>{this.setState({startDate: date})}}
                        label = "Start Date and Time"
                        />
                        <DateTimePicker currentDate={this.state.endDate} onDayPress={(date)=>{this.setState({endDate: date})}}
                        onTimeConfirm={(date)=>{this.setState({endDate: date})}}
                        label = "End Date and Time"
                        />
                        <ProgressBar disabled={false} value={this.state.completionRate} onChangeFunc={(val) => { this.setState({ completionRate: val }) }} />
                        <ProgressBar disabled value={this.state.completionRate} />
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
    errorDisplayed,
    addList
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TaskDetailsScreen);