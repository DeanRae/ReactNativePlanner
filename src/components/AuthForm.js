import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import PropTypes from 'prop-types';

class AuthForm extends Component {

    constructor(props) {
        super(props);

        const { fields, error, buttonDetails } = props;

        this.state = {
            ...fields,
            error: { ...error },
            buttonDetails: [...buttonDetails]
        };
    }


    render() {
        return null;
    }
}

AuthForm.PropTypes = {
    fields: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string,
    }).isRequired,
    error: PropTypes.shape({
        general: PropTypes.string.isRequired,
        email: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string
    }).isRequired,
    buttonDetails: PropTypes.arrayOf(
        PropTypes.shape({
            buttonTitle: PropTypes.string.isRequired,
            hasSolidColor: PropTypes.bool.isRequired,
            function: PropTypes.func.isRequired
        }).isRequired
    ).isRequired
}


const styles = StyleSheet.create({
    parentView: {
        flexGrow: 1,
        justifyContent: 'space-between'
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        margin: 10
    },
    formComponent: {
        margin: 10,
    },
});

