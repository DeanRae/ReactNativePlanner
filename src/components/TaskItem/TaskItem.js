import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import InputDialog from '../InputDialog';
import ProgressBar from '../ProgressBar';
import styles from './tiStyles'
import { get12HrTime, getFriendlyDateString } from '../utils/getNZDateTime';

export default class TaskItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { task, navigation } = this.props
        const startTime = get12HrTime(task.startDate);
        const startDate = getFriendlyDateString(new Date(task.startDate));

        return (
            <TouchableOpacity
                onPress={() => navigation.navigate("TaskDetails", {id: task.id})}
                style={styles.itemContainer}
            >
                <View style={styles.itemHeaderContainer}>
                    <Text style={styles.itemDateText}>Start Date: {startDate} {startTime}</Text>
                    <Text style={styles.itemInfoText}>Info</Text>
                    {/* <Text style={calStyles.itemDurationText}>{item.duration}</Text> */}
                </View>
                <Text style={styles.itemTitleText}>{task.title}</Text>



                <ProgressBar disabled value={task.completionRate} />
            </TouchableOpacity>
        );
    }
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
    navigation: PropTypes.any.isRequired
}