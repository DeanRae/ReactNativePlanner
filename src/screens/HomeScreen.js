import React, { Component } from 'react';
import { SafeAreaView, View, Alert, Text, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { getAllTasks, addTask, deleteTask, editTask, errorDisplayed } from '../actions/todoManagement/tasks';
import { getAllTaskLists } from '../actions/todoManagement/taskLists';
import { Button, Header, Icon } from 'react-native-elements';
import styles from '../components/utils/globalStyles';
import LoadingIndicator from '../components/LoadingIndicator';
import { getDateString } from '../components/utils/getNZDateTime';
import Accordion from '../components/Accordion/Accordion';
import CreateTaskFab from '../components/CreateTaskFab';
class HomeScreen extends Component {
    static navigationOptions = () => ({
        title: 'Home',
    });

    componentDidMount = () => {
        this.props.getAllTasks();
        this.props.getAllTaskLists();
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

    constructor(props) {
        super(props);

    }

    render() {
        const { user } = this.props;
        return (
            this.props.loading ? (
                <LoadingIndicator />
            ) :
                <>
                    <Header
                        centerComponent={{ text: 'Home', style: styles.header }}
                        backgroundColor="white"
                        containerStyle={styles.headerContainer}
                        statusBarProps={{ barStyle: 'dark-content' }}
                    />
                    <ScrollView
                        contentContainerStyle={styles.parentView}
                    >
                        <SafeAreaView style={styles.parentViewFlex}>
                            <View>
                                <Text style={styles.welcomeText}>
                                    {`Welcome ${user.displayName ? user.displayName : ''}`}
                                </Text>
                                <Button
                                    type='outline'
                                    title='Create New Task'
                                    onPress={() => { this.props.navigation.navigate('CreateTask') }}
                                    raised
                                    containerStyle={{ margin: 20 }}
                                    buttonStyle={{ paddingVertical: 15 }}
                                />
                            </View>
                            <View style={styles.accordionListContainer}>
                                <Accordion
                                    title="Tasks Due Today"
                                    expanded={true}
                                    items={this.props.tasksDueToday}
                                    options='none'
                                    noItemsText='No Tasks Due Today'
                                    navigation={this.props.navigation}
                                    hasSubList={false}
                                />

                                <Accordion
                                    title="Tasks Starting Today"
                                    expanded={false}
                                    items={this.props.tasksStartingToday}
                                    options='none'
                                    noItemsText='No Tasks Starting Today'
                                    navigation={this.props.navigation}
                                    hasSubList={false}
                                />

                            </View>
                        </SafeAreaView>
                    </ScrollView>
                    <CreateTaskFab navigation={this.props.navigation}/>
                </>

        );
    }

}

const mapStateToProps = ({ tasks: { taskOperationLoading, taskOperationError, tasks }, auth: { user } }) => ({
    loading: taskOperationLoading,
    error: taskOperationError,
    tasks: tasks.byId,
    tasksDueToday: Object.values(tasks.byId).filter(task => getDateString(new Date()) == getDateString(new Date(task.endDate)) && !task.isCompleted),
    tasksStartingToday: Object.values(tasks.byId).filter(task => getDateString(new Date()) == getDateString(new Date(task.startDate)) && !task.isCompleted),
    taskIds: tasks.allIds,
    user
});

const mapDispatchToProps = {
    getAllTasks,
    addTask,
    deleteTask,
    editTask,
    errorDisplayed,
    getAllTaskLists
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(HomeScreen);