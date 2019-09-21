import React, { Component } from "react";
import { Button, View, Modal, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Calendar } from "react-native-calendars";
import calendarTheme from '../../screens/Calendar/calendarTheme';
import calStyles from "../../screens/Calendar/calendarStyle";
import getNZDateTime, { get12HrTime, getDateString } from "../utils/getNZDateTime";
import Icon from 'react-native-vector-icons/Ionicons';
import styles from "./dtpStyles";


export default class DateTimePickerTester extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            isTimePickerVisible: false
        };
    }

    /**
     * Toggles the visibility of the date and time modal
     */
    toggleDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
    };

    /**
     * Toggles the visibility of the time picker
     */
    toggleTimePicker = () => {
        this.setState({ isTimePickerVisible: !this.state.isTimePickerVisible });
    }

    /**
     * Processes the user's chosen date and calls the prop function
     * for onDayPress.
     */
    handleDatePicked = date => {
        const newDate = this.onDayPress(date.dateString);
        this.props.onDayPress(newDate);
    };

    /**
     * Replaces the date from the previous current date Date string with
     * the dateString from the Calendar picker. This retains the time
     * from the date string.
     */
    onDayPress = date => {
        const { currentDate } = this.props;
        const tIndex = currentDate.indexOf('T');
        const newDate = date + currentDate.slice(tIndex);

        return newDate;
    }

    /**
     * Process the time from the picker and attach it to 
     * the date previously selected by user
     */
    handleTimePicked = time => {
        const { currentDate } = this.props;

        const tIndex = currentDate.indexOf('T');
        const date = getNZDateTime(time);
        const extractedTime = date.slice(tIndex + 1);
        const newDate = currentDate.slice(0, tIndex + 1) + extractedTime;

        this.props.onTimeConfirm(newDate);
        this.toggleTimePicker();
    }

    /**
     * Renders the top bar of the modal. It mimics the appearance of
     * an IOSInputAccessoryView bar.
     */
    renderModalHeader = () => {
        return (
            <>
                <TouchableOpacity
                    style={styles.modalHeaderContainer}
                    onPress={() => {
                        this.toggleDateTimePicker()
                    }}
                />
                <View style={styles.modalHeader}>
                    <Text>Select date and time</Text>
                </View>
            </>
        );
    }

    /**
     * Renders a calendar picker.
     */
    renderCalendarPicker = (date) => {
        return (
            <Calendar
                theme={calendarTheme}
                style={calStyles.calendar}
                current={date}
                onDayPress={this.handleDatePicked}
                monthFormat={'d MMMM yyyy'}
                firstDay={1}
                onPressArrowLeft={substractMonth => substractMonth()}
                onPressArrowRight={addMonth => addMonth()}
                markedDates={{ [date]: { selected: true, disableTouchEvent: true } }}
            />
        );
    }

    /**
     * Renders a time picker and its "button".
     */
    renderTimePicker = (currentDate, curDateObj) => {
        return (
            <>
                <TouchableOpacity onPress={this.toggleTimePicker}>
                    <View style={styles.timeLabelContainer}>
                        <Text style={styles.timeText}>Time: {get12HrTime(currentDate)}</Text>
                        <Icon name='ios-arrow-down' color='#43484d' size={20} style={styles.timeArrowIcon} />
                    </View>
                </TouchableOpacity>
                <DateTimePicker
                    mode='time'
                    titleIOS='Pick a time'
                    date={curDateObj}
                    isVisible={this.state.isTimePickerVisible}
                    onConfirm={this.handleTimePicked}
                    onCancel={this.toggleTimePicker}
                />
            </>
        )
    }

    render() {
        const { currentDate } = this.props;
        const curDateObj = new Date(currentDate);
        const date = getDateString(curDateObj);

        return (
            <>
                <Button title="Show DatePicker" onPress={this.toggleDateTimePicker} />
                <View style={styles.modalContainer}>

                    <Modal
                        animationType="slide"
                        transparent
                        visible={this.state.isDateTimePickerVisible}
                    >

                        {this.renderModalHeader()}
                        {this.renderCalendarPicker(date)}
                        {this.renderTimePicker(currentDate, curDateObj)}

                    </Modal>
                </View>
            </>
        );
    }
}
