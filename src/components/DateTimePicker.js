import React, { Component } from "react";
import { Button, View, Modal, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Calendar } from "react-native-calendars";
import calendarTheme from '../screens/Calendar/calendarTheme';
import calStyles from "../screens/Calendar/calendarStyle";
import getNZDateTime from "./utils/getNZDateTime";


export default class DateTimePickerTester extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            isTimePickerVisible: false
        };
    }

    toggleDateTimePicker = () => {
        this.setState({ isDateTimePickerVisible: !this.state.isDateTimePickerVisible });
    };

    toggleTimePicker = () => {
        this.setState({ isTimePickerVisible: !this.state.isTimePickerVisible });
    }

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
        const {currentDate} = this.props;
        const tIndex = currentDate.indexOf('T');
        const newDate = date + currentDate.slice(tIndex);

        return newDate;
    }

    /**
     * Process the time from the picker and attach it to 
     * the date previously selected by user
     */
    handleTimePicked = time => {
        const {currentDate} = this.props;

        const tIndex = currentDate.indexOf('T');
        const date = getNZDateTime(time);
        const extractedTime = date.slice(tIndex + 1);
        const newDate = currentDate.slice(0, tIndex+1) + extractedTime;

        this.props.onTimeConfirm(newDate);
    }

    render() {
        const {currentDate} = this.props;
        const calDate = new Date(currentDate);

        return (
            <>
                <Button title="Show DatePicker" onPress={this.toggleDateTimePicker} />
                <View style={{ height: 300, alignSelf: 'stretch' }}>

                    <Modal
                        animationType="slide"
                        transparent
                        visible={this.state.isDateTimePickerVisible}
                    >
                        <TouchableOpacity
                            style={{ flex: 1 }}
                            onPress={() => {
                                this.toggleDateTimePicker()
                            }}
                        />
                        <View style={{
                            height: 50,
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            paddingHorizontal: 10,
                            backgroundColor: '#EFF1F2',
                            borderTopWidth: 0.5,
                            borderTopColor: '#919498',
                            zIndex: 2,
                        }} />
                        <Calendar
                            theme={calendarTheme}
                            style={calStyles.calendar}
                            current={calDate}
                            onDayPress={this.handleDatePicked}
                            monthFormat={'d MMMM yyyy'}
                            firstDay={1}
                            onPressArrowLeft={substractMonth => substractMonth()}
                            onPressArrowRight={addMonth => addMonth()}
                            markedDates={{ [calDate]: { selected: true, disableTouchEvent: true } }}
                        />
                       

                       
                        <TouchableOpacity onPress={this.toggleTimePicker}>
                        <View  style={{backgroundColor: 'white', height: 44, margin: 20 }}>
                            <Text>Time: </Text>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            mode='time'
                            isVisible={this.state.isTimePickerVisible}
                            onConfirm={this.handleTimePicked}
                            onCancel={this.toggleTimePicker}
                        />
                    </Modal>
                </View>
            </>
        );
    }
}
