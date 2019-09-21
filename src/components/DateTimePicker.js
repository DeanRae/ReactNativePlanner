import React, { Component } from "react";
import { Button, View, Modal, TouchableOpacity, Text } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";
import { Calendar } from "react-native-calendars";
import calendarTheme from '../screens/Calendar/calendarTheme';
import calStyles from "../screens/Calendar/calendarStyle";

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
        console.log("tohhhhh");
        this.setState({ isTimePickerVisible: !this.state.isTimePickerVisible });
    }

    handleDatePicked = date => {
        console.log("A date has been picked: ", date);
        this.hideDateTimePicker();
    };

    onDayPress = date => {
        const {currentDate} = this.props;

    }

    render() {
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
                            current={this.props.currentDate}
                            onDayPress={(day) => { this.props.onDayPress(day.dateString) }}
                            monthFormat={'d MMMM yyyy'}
                            onMonthChange={(month) => { console.log('month changed', month) }}
                            firstDay={1}
                            onPressArrowLeft={substractMonth => substractMonth()}
                            onPressArrowRight={addMonth => addMonth()}
                            markedDates={{ [this.props.currentDate]: { selected: true, disableTouchEvent: true } }}
                        />
                       

                       
                        <TouchableOpacity onPress={this.toggleTimePicker}>
                        <View  style={{backgroundColor: 'white', height: 44, margin: 20 }}>
                            <Text>Time: </Text>
                            </View>
                        </TouchableOpacity>
                        <DateTimePicker
                            mode='time'
                            isVisible={this.state.isTimePickerVisible}
                            onConfirm={(time) => {this.props.onTimeConfirm(time)}}
                            onCancel={this.toggleTimePicker}
                        />
                    </Modal>
                </View>
            </>
        );
    }
}
