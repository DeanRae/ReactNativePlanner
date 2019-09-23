import React, { Component } from 'react';
import { View, Text, TouchableOpacity, ActionSheetIOS } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import InputDialog from '../InputDialog';
import styles from './accStyles'

const initState = {
    isExpanded: false
}
export default class Accordion extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...initState
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
                    onTitleEdit();
                } else if (buttonIndex === 1) {
                    onListDelete();
                } else if (buttonIndex === 2) {
                    onListItemsDelete();
                }
            },
        );
    }
    render() {
        const { title, hasOptions, listId, onListDelete, onListItemsDelete, onTitleEdit } = this.props;
        const {isExpanded} = this.state;
        return (
            <TouchableOpacity 
            style={styles.accordionContainer}
            onPress={()=> {this.setState({isExpanded: !isExpanded})}}
            >
                <Text style={styles.label}>{title}</Text>
                <View style={styles.buttonContainer}>
                    <Icon
                        name={isExpanded ? "ios-arrow-up" : "ios-arrow-down"}
                        size={25}
                        color='#43484d'
                    />
                    {hasOptions ?
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


                </View>
            </TouchableOpacity>
        );
    }
}

Accordion.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired
    })).isRequired,
    title: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    hasOptions: PropTypes.bool.isRequired,
    onTitleEdit: PropTypes.func.isRequired,
    onListDelete: PropTypes.func.isRequired,
    onListItemsDelete: PropTypes.func.isRequired,
    listId: PropTypes.string
}