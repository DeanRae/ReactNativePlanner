import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './stStyles';
import InputDialog from '../InputDialog';

const initState = {
    isEditTaskDialogVisible: false,
    editedTaskValue: '',
    isAddTaskDialogVisible: false,
    newTaskValue: ''
}
export default class SubtaskContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            ...initState
        }
    }

    /**
     * Renders the input dialog for editing a subtask
     */
    renderEditInputDialog = (index, subtask) => {
        return <InputDialog
            title='Edit Subtask'
            inputs={{ subtask: this.state.editedTaskValue }}
            isVisible={this.state.isEditTaskDialogVisible}
            onSaveFunc={() => {
                this.props.onEdit(index, { ...subtask, value: this.state.editedTaskValue });
                this.setState({ isEditTaskDialogVisible: false, editedTaskValue: '' });
            }}
            onChangeFunc={(field, newInput) => {
                this.setState({ editedTaskValue: newInput })
            }}
            onCancelFunc={() => {
                this.setState({ editedTaskValue: '', isEditTaskDialogVisible: false });
            }}
        />
    }

    /**
     * Renders the dialog for creating new subtasks
     */
    renderNewTaskInputDialog = () => {
        return <InputDialog
            title='Create New Subtask'
            inputs={{ subtask: this.state.newTaskValue }}
            isVisible={this.state.isAddTaskDialogVisible}
            onSaveFunc={() => {
                this.props.onAdd({ isChecked: false, value: this.state.newTaskValue });
                this.setState({ isAddTaskDialogVisible: false, newTaskValue: '' });
            }}
            onChangeFunc={(field, newInput) => {
                this.setState({ newTaskValue: newInput })
            }}
            onCancelFunc={() => {
                this.setState({ newTaskValue: '', isAddTaskDialogVisible: false });
            }}
        />
    }

    /**
     * Renders the header of the subtasks container.
     * Contains the overall label and add new task button
     */
    renderSubtaskHeader = (disabled) => {
        return <View style={styles.subtaskHeader}>
            <Text style={styles.label}>Subtasks</Text>
            {!disabled ? <Button
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
                onPress={() => { this.setState({ isAddTaskDialogVisible: true }) }}
            /> : null}

        </View>
    }

    /**
     * Renders the edit and delete buttons of 
     * each subtask
     */
    renderSubtaskButtons = (index, subtask) => {
        return <View style={styles.buttonContainer}>
            <Button
                icon={
                    <Icon
                        name="ios-trash"
                        size={35}
                        color='#ff3b30'
                    />}
                type='clear'
                onPress={() => { this.props.onDelete(index) }}
            />
            <Button
                icon={
                    <Icon
                        raised
                        name="md-create"
                        size={35}
                        color='#007aff'
                    />}
                type='clear'
                onPress={() => {
                    this.setState({ editedTaskValue: subtask.value, isEditTaskDialogVisible: true });
                }}
            />
        </View>
    }

    render() {
        const { subtasks, onEdit, disabled } = this.props;
        return (
            <View>
                {this.renderSubtaskHeader(disabled)}
                <View style={styles.subtaskContainer}>
                    {
                        subtasks.length ? subtasks.map((subtask, index) => {
                            return (
                                <View style={styles.subtask} key={index}>
                                    <CheckBox
                                        title={subtask.value}
                                        checked={subtask.isChecked}
                                        containerStyle={{ width: 200 }}
                                        onIconPress={() => {
                                            onEdit(index, {
                                                ...subtask, isChecked: !subtask.isChecked
                                            });
                                        }}
                                        onPress={() => {
                                            onEdit(index, {
                                                ...subtask, isChecked: !subtask.isChecked
                                            });
                                        }}
                                    />

                                    {!disabled ? this.renderSubtaskButtons(index, subtask) : null}
                                    {this.renderEditInputDialog(index, subtask)}

                                </View>
                            );
                        })
                            :

                            <Text style={styles.noSubtasksText}>
                                This task currently has no subtasks
                            </Text>
                    }
                </View>
                {this.renderNewTaskInputDialog()}
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
    onDelete: PropTypes.func.isRequired,
    onEdit: PropTypes.func.isRequired,
    onAdd: PropTypes.func.isRequired
}
