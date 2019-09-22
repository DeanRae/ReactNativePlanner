import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './stStyles';

export default class SubtaskContainer extends Component {

    render() {
        const { subtasks } = this.props;
        return (
            <View>
                <View style={styles.subtaskHeader}>
                    <Text style={styles.label}>Subtasks</Text>
                    <Button
                        title='Add New Subtask'
                        type='clear'
                    icon={
                        <Icon
                            name="ios-add"
                            size={20}
                            color='#007aff'
                        />
                    }
                    iconRight
                    />
                </View>
                <View style={styles.subtaskContainer}>
                    {
                        subtasks.length ? subtasks.map((field, key) => {

                        }) :

                        <Text style={styles.noSubtasksText}>
                            This task currently has no subtasks
                        </Text>
                    }

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
