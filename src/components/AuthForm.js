import React, { Component } from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input, Button } from 'react-native-elements';
import { validate } from '../components/utils/inputValidation';


export default class AuthForm extends Component {

    constructor(props) {
        super(props);

        const { fields, initErrors } = props;

        this.state = {
            fields: { ...fields },
            error: { ...initErrors },
        };
    }

    /**
     * Sets the error messages in the state if an error was encountered
     */
    onError = (errorData) => {
        let errObj = { ...this.state.error };

        let keys = Object.keys(errorData);
        keys.map((key, index) => {
            errObj[key] = errorData[key][0];
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
            this.setState({ error: initErrors }); // reset errors if no validation errors
        }
    }

    /**
     * Checks that all fields are valid
     */
    allFieldsValid = () => {
        let errorKeys = Object.keys(this.props.initErrors);

        return errorKeys.every(key => {
            if (this.state.error[key] || this.state.fields[key] == "") {
                return false;
            }
            return true;
        });
    }

    /**
     * Returns the matching icon given the fieldName
     */
    getIconName = (fieldName) => {
        if (fieldName.toLowerCase().includes("password")) {
            return "key";
        } else if (fieldName.includes("email")) {
            return "envelope";
        } else {
            return "user";
        }
    }

    /**
     * Sets the new state and checks for the validity of the new input 
     * every time input changes. 
     */
    onChangeText = (field, newInput) => {
        let fieldsObj = {...this.state.fields, [field]: newInput};
        this.setState({ fields : fieldsObj });

        if (field == 'confirmPassword') {
            // must supply password as well to check for equality
            this.validateInput({
                confirmPassword: newInput,
                password: this.state.fields.password
            });
        } else {
            this.validateInput({ [field]: newInput });
        }
    }

    render() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.parentView}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <SafeAreaView style={styles.centered}>
                    {Object.entries(this.props.fields).map((field, key) =>
                        <Input
                            label={field[0] == 'confirmPassword' ? 'confirm password' : field[0]}
                            secureTextEntry={field[0].toLowerCase().includes("password")}
                            autoCompleteType={field[0] == 'confirmPassword' ? 'password' : field[0]}
                            autoCapitalize={field[0] == 'name' ? 'words' : 'none'}
                            leftIcon={{ type: 'font-awesome', name: this.getIconName(field[0]) }}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.error[field[0]]}
                            key={key}
                            containerStyle={styles.formComponent}
                            onChangeText={newInput => {
                                this.onChangeText(field[0], newInput);
                            }}
                        />
                    )}
                    {this.props.buttonDetails.map((buttonDet, key) =>
                        <Button
                            type={buttonDet.hasSolidColor ? 'solid' : 'clear'}
                            raised = {true}
                            disabled={buttonDet.hasSolidColor ? !this.allFieldsValid() : false}
                            title={buttonDet.buttonTitle}
                            key={key}
                            onPress={() => {buttonDet.onPressFunc({...this.state.fields})}}
                        />
                    )}
                </SafeAreaView>
            </KeyboardAwareScrollView>
        );
    }
}

AuthForm.propTypes = {
    fields: PropTypes.shape({
        email: PropTypes.string,
        name: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string,
    }).isRequired,
    initErrors: PropTypes.shape({
        email: PropTypes.string,
        password: PropTypes.string,
        confirmPassword: PropTypes.string
    }).isRequired,
    buttonDetails: PropTypes.arrayOf(
        PropTypes.shape({
            buttonTitle: PropTypes.string.isRequired,
            hasSolidColor: PropTypes.bool.isRequired,
            onPressFunc: PropTypes.func.isRequired
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
        marginBottom: 10,
    },
});

