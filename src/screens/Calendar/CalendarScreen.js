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
import styles from '../../components/utils/globalStyles';
import calendarTheme from './calendarTheme';
import calStyles from './calendarStyle';



const today = new Date().toISOString().split('T')[0];
const fastDate = getPastDate(3);
const futureDates = getFutureDates(9);
const dates = [fastDate, today].concat(futureDates);

function getFutureDates(days) {
    const array = [];
    for (let index = 1; index <= days; index++) {
        const date = new Date(Date.now() + (864e5 * index)); // 864e5 == 86400000 == 24*60*60*1000
        const dateString = date.toISOString().split('T')[0];
        array.push(dateString);
    }
    return array;
}

function getPastDate(days) {
    return new Date(Date.now() - (864e5 * days)).toISOString().split('T')[0];
}

const ITEMS = [
    { title: dates[0], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] },
    { title: dates[1], data: [{ hour: '4pm', duration: '1h', title: 'Pilates ABC' }, { hour: '5pm', duration: '1h', title: 'Vinyasa Yoga' }] },
    { title: dates[2], data: [{ hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' }, { hour: '2pm', duration: '1h', title: 'Deep Streches' }, { hour: '3pm', duration: '1h', title: 'Private Yoga' }] },
    { title: dates[3], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] },
    { title: dates[4], data: [{}] },
    { title: dates[5], data: [{ hour: '9pm', duration: '1h', title: 'Pilates Reformer' }, { hour: '10pm', duration: '1h', title: 'Ashtanga' }, { hour: '11pm', duration: '1h', title: 'TRX' }, { hour: '12pm', duration: '1h', title: 'Running Group' }] },
    { title: dates[6], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] },
    { title: dates[7], data: [{}] },
    { title: dates[8], data: [{ hour: '9pm', duration: '1h', title: 'Pilates Reformer' }, { hour: '10pm', duration: '1h', title: 'Ashtanga' }, { hour: '11pm', duration: '1h', title: 'TRX' }, { hour: '12pm', duration: '1h', title: 'Running Group' }] },
    { title: dates[9], data: [{ hour: '1pm', duration: '1h', title: 'Ashtanga Yoga' }, { hour: '2pm', duration: '1h', title: 'Deep Streches' }, { hour: '3pm', duration: '1h', title: 'Private Yoga' }] },
    { title: dates[10], data: [{ hour: '12am', duration: '1h', title: 'Ashtanga Yoga' }] }
];
class CalendarScreen extends Component {
    static navigationOptions = () => ({
        title: 'Calendar'
    });

    componentDidUpdate = (prevProps) => {

        if (this.props.error) {
            Alert.alert(
                'User Profile Error',
                this.props.error,
            );

            this.props.errorDisplayed();
        }
    }

    onDateChanged = (/* date, updateSource */) => {
        // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
        // fetch and set data for date + week ahead
    }

    onMonthChange = (/* month, updateSource */) => {
        // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
    }

    buttonPressed() {
        Alert.alert('show more');
    }

    itemPressed(id) {
        Alert.alert(id);
    }

    renderEmptyItem() {
        return (
            <View style={calStyles.emptyItem}>
                <Text style={calStyles.emptyItemText}>No Events Planned</Text>
            </View>
        );
    }

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
                    <Text style={calStyles.itemHourText}>{item.hour}</Text>
                    <Text style={calStyles.itemDurationText}>{item.duration}</Text>
                </View>
                <Text style={calStyles.itemTitleText}>{item.title}</Text>
                <View style={calStyles.itemButtonContainer}>
                    <Button title={'Info'} onPress={this.buttonPressed} />
                </View>
            </TouchableOpacity>
        );
    }

    getMarkedDates = () => {
        const marked = {};
        ITEMS.forEach(item => {
            // only mark dates with data
            if (item.data && item.data.length > 0 && !_.isEmpty(item.data[0])) {
                marked[item.title] = { marked: true };
            }
        });
        return marked;
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
                            date={ITEMS[0].title}
                            onDateChanged={this.onDateChanged}
                            onMonthChange={this.onMonthChange}
                            theme={{ todayButtonTextColor: '#007aff' }}
                            showTodayButton
                            disabledOpacity={0.6}
                            todayBottomMargin={20}
                        >
                            <ExpandableCalendar
                                initialPosition={ExpandableCalendar.positions.OPEN}
                                firstDay={1}
                                markedDates={this.getMarkedDates()}
                                theme={calendarTheme}
                                calendarStyle={styles.calendar}
                                headerStyle={styles.calendar} 
                            />
                            <AgendaList
                                sections={ITEMS}
                                extraData={this.state}
                                renderItem={this.renderItem}
                                sectionStyle={styles.section}
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
)(CalendarScreen);