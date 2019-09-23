import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import InputDialog from '../InputDialog';
import styles from './accStyles'

const initState = {
    isExpanded: false,
    isEditListTitleDialogVisible: false,
    title: ''
}
export default class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initState,
            title: this.props.title
        }
    }

    showActionSheet = () => {
        ActionSheetIOS.showActionSheetWithOptions(
            {
                options: ['Edit List Title', 'Delete List', 'Delete All List Items', 'Cancel'],
                destructiveButtonIndex: [1, 2],
                cancelButtonIndex: 3,
            },
            (buttonIndex) => {
                if (buttonIndex === 0) {
                    this.setState({ isEditListTitleDialogVisible: true });
                } else if (buttonIndex === 1) {
                    onListDelete();
                } else if (buttonIndex === 2) {
                    onListItemsDelete();
                }
            },
        );
    }

    renderEditTitleDialog = () => {
        if (this.props.hasOptions) {
            return <InputDialog
                title='Edit List Title'
                inputs={{ title: this.state.title }}
                isVisible={this.state.isEditListTitleDialogVisible}
                onSaveFunc={() => {
                    this.props.onTitleEdit(this.props.listId, { title: this.state.title });
                    this.setState({ isEditTaskDialogVisible: false });
                }}
                onChangeFunc={(field, newInput) => {
                    this.setState({ title: newInput })
                }}
                onCancelFunc={() => {
                    this.setState({ title: this.props.title, isEditListTitleDialogVisible: false });
                }}
            />
        }

    }

    renderIconButtons = () => {
        return <View style={styles.buttonContainer}>
            <Icon
                name={this.state.isExpanded ? "ios-arrow-up" : "ios-arrow-down"}
                size={25}
                color='#43484d'
            />
            {this.props.hasOptions ?
                <Button
                    type="clear"
                    icon={<Icon
                        name="md-more"
                        size={25}
                        color='#007aff'
                    />}
                    onPress={() => {
                        this.showActionSheet();
                    }}
                />
                : null}

            {this.renderEditTitleDialog()}
        </View>
    }


    render() {
        const { title, hasOptions, listId, onListDelete, onListItemsDelete, onTitleEdit } = this.props;
        const { isExpanded } = this.state;
        return (
            <>
                <TouchableOpacity
                    style={styles.accordionContainer}
                    onPress={() => { this.setState({ isExpanded: !isExpanded }) }}
                >
                    <Text style={styles.label}>{title}</Text>
                    {this.renderIconButtons()}
                </TouchableOpacity>
                <>
                    {this.renderEditTitleDialog()}
                </>
            </>
        );
    }
}

Accordion.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired
    })).isRequired,
    title: PropTypes.string.isRequired,
    hasOptions: PropTypes.bool.isRequired,
    onTitleEdit: PropTypes.func.isRequired,
    onListDelete: PropTypes.func.isRequired,
    onListItemsDelete: PropTypes.func.isRequired,
    listId: PropTypes.string
}