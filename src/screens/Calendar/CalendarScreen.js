/**
 * Code adapted from https://github.com/wix/react-native-calendars/blob/master/src/expandableCalendar/index.js
 */
import _ from 'lodash';
import React, { Component } from 'react';
import {
    Alert,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import { ExpandableCalendar, AgendaList, CalendarProvider } from 'react-native-calendars';
import { Header, Button } from 'react-native-elements';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getAllTasks, addTask, deleteTask, editTask, errorDisplayed } from '../../actions/todoManagement/tasks';
import { getDateString, get12HrTime, getFriendlyDateString } from '../../components/utils/getNZDateTime';
import styles from '../../components/utils/globalStyles';
import calendarTheme from './calendarTheme';
import calStyles from './calendarStyle';
import Icon from 'react-native-vector-icons/Ionicons';

let dates = [];
let ITEMS = [];
let marked = {};

class CalendarScreen extends Component {
    static navigationOptions = () => ({
        title: 'Calendar'
    });

    constructor(props) {
        super(props);
        const { tasks } = props;

        // get all dates to render in agenda
        this.getAllDates();

        // set the agenda items for each date
        this.getAllItems();

        // mark dates that have items
        this.getMarkedDates();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.tasks !== this.props.tasks) {
            this.getAllDates();
            this.getAllItems();
            this.getMarkedDates();
        }

        if (this.props.error) {
            Alert.alert(
                'Error',
                this.props.error,
            );

            this.props.errorDisplayed();
        }
    }

    /**
     * get all dates to render in agenda
     */
    getAllDates = () => {
        const { tasks } = this.props;

        if (!tasks.length) {
            return;
        }

        dates = this.getDaysArray(getDateString(new Date(tasks[0].startDate)), getDateString(new Date(tasks[tasks.length - 1].startDate)));
    }

    /**
     * set the agenda items for each date
     */
    getAllItems = () => {
        const { tasks } = this.props;

        if (!dates.length) {
            return;
        }

        const newItems = [];
        dates.forEach(date => {
            const items = tasks.filter(task => (date == getDateString(new Date(task.startDate))));

            newItems.push({ title: date, data: items.length ? items : [{}] });
        });

        ITEMS = newItems;
    }

    /**
     * Renders the all the dates between two dates. Code 
     * from from https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
     */
    getDaysArray = (start, end) => {
        for (var arr = [], dt = new Date(start); dt <= new Date(end); dt.setDate(dt.getDate() + 1)) {
            arr.push(new Date(dt));
        }

        const dateStrings = arr.map(date => getDateString(new Date(date)));
        return dateStrings;
    };

    /**
     * Goes to task details page when item in agenda is clicked.
     * @param {*} id 
     */
    itemPressed(id) {
        this.props.navigation.navigate("TaskDetails", { id: id });
    }

    /**
     * Renders for dates that don't have items
     */
    renderEmptyItem() {
        return (
            <View style={calStyles.emptyItem}>
                <Text style={calStyles.emptyItemText}>No Events Planned</Text>
            </View>
        );
    }

    /**
     * Renders the items of each date
     */
    renderItem = ({ item }) => {
        if (_.isEmpty(item)) {
            return this.renderEmptyItem();
        }

        return (
            <TouchableOpacity
                onPress={() => this.itemPressed(item.id)}
                style={calStyles.item}
            >
                <View>
                    <View style={calStyles.itemTopRow}>
                        <Text>{get12HrTime(item.startDate)}</Text>
                        <Text style={calStyles.itemTitleText}>{item.title}</Text>
                    </View>

                    <Text style={[calStyles.itemDueDateText]}>Due Date: {getFriendlyDateString(new Date(item.endDate))} {get12HrTime(item.endDate)}</Text>
                </View>
                <View style={calStyles.itemButtonContainer}>
                    <Text style={calStyles.infoText}>Info</Text>
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * Gets all the dates that have items
     */
    getMarkedDates = () => {
        if (!ITEMS.length) {
            return;
        }

        const mark = {};
        ITEMS.forEach(item => {
            // only mark dates with data
            if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
                mark[item.title] = { marked: true };
            }
        });

        marked = { ...marked, ...mark };
    }

    render() {
        return (
            <View style={styles.parentView}>
                <Header
                    centerComponent={{ text: 'Calendar', style: styles.header }}
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
                            onPress={()=>{this.props.navigation.navigate("CreateTask");}}
                        />
                    }
                />

                {this.props.loading ? (
                    <LoadingIndicator />
                ) : (
                        <CalendarProvider
                            date={getDateString(new Date())}
                            theme={{ todayButtonTextColor: '#007aff' }}
                            showTodayButton
                            disabledOpacity={0.6}
                            todayBottomMargin={20}
                        >
                            <ExpandableCalendar
                                initialPosition={ExpandableCalendar.positions.OPEN}
                                firstDay={1}
                                markedDates={marked}
                                theme={calendarTheme}
                                calendarStyle={calStyles.calendar}
                                headerStyle={calStyles.calendar}
                            />
                            <AgendaList
                                sections={ITEMS}
                                extraData={this.state}
                                renderItem={this.renderItem}
                                sectionStyle={calStyles.section}
                            />
                        </CalendarProvider>
                    )}
            </View>

        );
    }
}

const mapStateToProps = ({ tasks: { taskOperationLoading, taskOperationError, tasks } }) => ({
    loading: taskOperationLoading,
    error: taskOperationError,
    tasks: Object.values(tasks.byId).sort((task1, task2) => (new Date(task1.startDate) < new Date(task2.startDate)) ? -1 : (new Date(task1.startDate) === new Date(task2.startDate)) ? ((task1.createdTimestamp.seconds < task2.createdTimestamp.seconds) ? -1 : 1) : 1),
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
)(CalendarScreen);