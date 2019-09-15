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

    /**
     * Returns the matching icon given the fieldName
     */
    getIconName = (fieldName) => {
        if (fieldName.includes(password)) {
            return "lock-alt";
        } else if (fieldName.includes(email)) {
            return "envelope";
        } else {
            return "user";
        }
    }

    /**
     * Returns the error message of the error property matching the given
     * fieldName
     */
    getMatchingError = (fieldName) => {
        // if key matches fieldname, return value
        Object.entries(this.state.errors).map(error => {
            if (fieldName == error[0]) {
                return error[1];
            }
        });

        return '';
    }

    render() {
        <KeyboardAwareScrollView
                contentContainerStyle={styles.parentView}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <SafeAreaView style={styles.centered}>
                {Object.entries(this.state.fields).map(field => 
                    <Input
                    placeholder='INPUT WITH ERROR MESSAGE'
                    leftIcon={{ type: 'font-awesome', name: this.getIconName(field[0]) }}
                    errorStyle={{ color: 'red' }}
                    errorMessage= {this.getMatchingError(field[0])}
                  />
                )}
                </SafeAreaView>
            </KeyboardAwareScrollView>
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

