/**
 * Code adapted from https://github.com/wix/react-native-calendars/blob/master/src/expandableCalendar/index.js
 */
import _ from 'lodash';
import React, { Component } from 'react';
import {
    Platform,
    Alert,
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Button
} from 'react-native';
import { connect } from 'react-redux';
import { ExpandableCalendar, AgendaList, CalendarProvider } from 'react-native-calendars';
import { Header } from 'react-native-elements';
import LoadingIndicator from '../../components/LoadingIndicator';
import { getAllTasks, addTask, deleteTask, editTask, errorDisplayed } from '../../actions/todoManagement/tasks';
import {getDateString, get12HourTime} from '../../components/utils/getNZDateTime';
import styles from '../../components/utils/globalStyles';
import calendarTheme from './calendarTheme';
import calStyles from './calendarStyle';

const dates = [];
const ITEMS = [];
let marked ={};

class CalendarScreen extends Component {
    static navigationOptions = () => ({
        title: 'Calendar'
    });

    constructor(props) {
        super(props);
        const { tasks } = props;

        // get all dates to render in agenda
        dates.push(...this.getDaysArray(getDateString(new Date(tasks[0].startDate)), getDateString(new Date(tasks[tasks.length -1].startDate))));

        // set the agenda items for each date
        dates.forEach(date => { 
            const items = tasks.filter(task => (date == getDateString(new Date(task.startDate))));

            ITEMS.push({title: date, data: items.length ? items:[{}]});
        });

        // mark dates that have items
        this.getMarkedDates();
    }

    componentDidUpdate = (prevProps) => {
        if (prevProps.tasks === this.props.tasks) {
            this.getMarkedDates();
        }
        if (this.props.error) {
            Alert.alert(
                'User Profile Error',
                this.props.error,
            );

            this.props.errorDisplayed();
        }
    }

    /**
     * Renders the all the dates between two dates. Code 
     * from from https://stackoverflow.com/questions/4413590/javascript-get-array-of-dates-between-2-dates
     */
    getDaysArray = (start, end) => {
        for(var arr=[],dt=new Date(start); dt<=new Date(end); dt.setDate(dt.getDate()+1)){
            arr.push(new Date(dt));
        }
        
        const dateStrings = arr.map(date =>  getDateString(new Date(date)));
        return dateStrings;
    };

    buttonPressed() {
        Alert.alert('show more');
    }

    itemPressed(id) {
        Alert.alert(id);
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
                onPress={() => this.itemPressed(item.title)}
                style={calStyles.item}
            >
                <View>
                    <Text style={calStyles.itemHourText}>{item.startDate}</Text>
                    <Text style={calStyles.itemDurationText}>{item.duration}</Text>
                </View>
                <Text style={calStyles.itemTitleText}>{item.title}</Text>
                <View style={calStyles.itemButtonContainer}>
                    <Button title={'Info'} onPress={this.buttonPressed} />
                </View>
            </TouchableOpacity>
        );
    }

    /**
     * Gets all the dates that have items
     */
    getMarkedDates = () => {
         const mark = {};
        ITEMS.forEach(item => {
            // only mark dates with data
            if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
                mark[item.title] = { marked: true };
            }
        });

        marked = {...marked, ...mark};
    }

    render() {
        return (
            <View style={styles.parentView}>
                <Header
                    centerComponent={{ text: 'Calendar', style: styles.header }}
                    backgroundColor="white"
                    containerStyle={styles.headerContainer}
                    statusBarProps={{ barStyle: 'dark-content' }}
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
    tasks: Object.values(tasks.byId).sort((task1, task2) => (new Date(task1.startDate) < new Date(task2.startDate))? -1 : (new Date(task1.startDate) === new Date(task2.startDate)) ? ((task1.createdTimestamp.seconds < task2.createdTimestamp.seconds) ? -1 : 1) : 1 ),
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