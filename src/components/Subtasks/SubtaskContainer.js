import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './stStyles';

export default class SubtaskContainer extends Component {

    render() {
        return (
            <View>
                <View style={styles.subtaskHeader}>
                    <Text style={styles.label}>Subtasks</Text>
                    <Button
                        title='Add New Subtask'
                        type='clear'
                        // icon={
                        //     <Icon
                        //         name="ios-add"
                        //         size={20}
                        //         color='#007aff'
                        //     />
                        // }
                        // iconRight
                    />
                </View>
            </View>
        );
    }

}

SubtaskContainer.propTypes = {
    subtasks: PropTypes.arrayOf(
        PropTypes.shape({
            isChecked: PropTypes.bool.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,

}
