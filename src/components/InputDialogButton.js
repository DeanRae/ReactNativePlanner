import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';

export default class InputDialogButton extends Component {


    render() {
        return (

            <TouchableOpacity
                onPress={this.toggleOpacity('name')}
            >
                <Input
                    disabled={true}
                    label='Name'
                    value={this.props.user.displayName}
                    rightIcon={{ type: 'font-awesome', name: 'pencil' }}
                />
            </TouchableOpacity>
        );
    }
}

InputDialogButton.propTypes = {
    fields: PropTypes.objectOf(PropTypes.string).isRequired,
}