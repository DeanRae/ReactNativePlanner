import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FormLabel, FormInput, FormValidationMessage } from 'react-native-elements'
import PropTypes from 'prop-types';

class AuthForm extends Component {

    constructor(props) {
        super(props);

        const { fields, buttonDetails } = props;

        this.state = {
            fields: { ...fields },
            error: { ...fields },
            buttonDetails: [...buttonDetails]
        };
    }

    /**
     * Sets the error messages in the state if an error was encountered
     */
    onError = (errorData) => {
        let errObj = { ...this.state.error };

        let keys = Object.keys(errorData);
        keys.map((key, index) => {
            errObj[key] = errorData[key];
        })

        this.setState({ error: errObj });
    }

    /**
     * Validates the given fields using utils/inputValidation
     * fields should be in the form of {fieldName: fieldValue, ...}
     */
    validateInput = (fields) => {
        let result = validate(fields);

        if (result) {
            this.onError(result);
        } else {
            this.setState({ error: error }); // reset errors if no validation errors
        }
    }

    /**
     * Checks that all fields are valid
     */
    allFieldsValid = () => {
        const errorValues = Object.values(this.state.errors);
        for (const error of errorValues) {
            if (error) {
                return false;
            }
        }

        return true;
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
                        errorMessage={this.state.error[field[0]]}
                    />
                )}
                {
                }
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
    buttonDetails: PropTypes.arrayOf(
        PropTypes.shape({
            buttonTitle: PropTypes.string.isRequired,
            hasSolidColor: PropTypes.bool.isRequired,
            function: PropTypes.func.isRequired
        }).isRequired
    )
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

