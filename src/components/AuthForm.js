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
            fields: this.setFieldProperties(fields, initErrors),
            error: { ...initErrors },
        };

        console.log("stts", this.state)
    }

    setFieldProperties = (fields, initErrors) => {
        return Object.keys(fields)
            .reduce((obj, field) => (
                obj[field] = { fieldName: this.formatFieldName(field, initErrors), value: '' }, obj), {});
    }

    /**
     * Splits camel casing and capitalizes first letter.
     * If field is present in errors, then field is required and
     * is attached (Required) tag
     */
    formatFieldName = (fieldName, initErrors) => {
        let formattedFieldName = fieldName.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => { return str.toUpperCase() });

        return fieldName in initErrors ? formattedFieldName + " (Required)" : formattedFieldName;
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
            if (this.state.error[key] || this.state.fields[key].value == "") {
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
            return "ios-key";
        } else if (fieldName.includes("email")) {
            return "ios-mail";
        } else {
            return "ios-person";
        }
    }

    /**
     * Sets the new state and checks for the validity of the new input 
     * every time input changes. 
     */
    onChangeText = (field, newInput) => {
        let changedField = { ...this.state.fields[field], value: newInput };
        let fieldsObj = { ...this.state.fields, [field]: changedField };
        this.setState({ fields: fieldsObj });

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

    extractValues = () => {
        Object.keys(this.state.fields)
            .reduce((obj, field) => (
                obj[field] = this.state.fields[field].value, obj), {});
    }

    render() {
        return (
            <KeyboardAwareScrollView
                contentContainerStyle={styles.parentView}
                resetScrollToCoords={{ x: 0, y: 0 }}
            >
                <SafeAreaView style={styles.centered}>
                    {Object.entries(this.props.fields).map((field, key) => {
                        const { fieldName } = this.state.fields[field[0]];
                        const isPassword = field[0].toLowerCase().includes("password");
                        const fieldKey = field[0];

                        return <Input
                            label={fieldName}
                            secureTextEntry={isPassword}
                            autoCompleteType={isPassword ? 'password' : fieldKey}
                            autoCapitalize={fieldKey == 'name' ? 'words' : 'none'}
                            keyboardType={fieldKey == 'email' ? 'email-address' : 'default'}
                            leftIcon={{ type: 'ionicon', name: this.getIconName(fieldKey), color: '#43484d' }}
                            errorStyle={{ color: 'red' }}
                            errorMessage={this.state.error[fieldKey]}
                            key={key}
                            containerStyle={styles.formComponent}
                            onChangeText={newInput => {
                                this.onChangeText(fieldKey, newInput);
                            }}
                        />
                    })}
                    {this.props.buttonDetails.map((buttonDet, key) =>
                        <Button
                            type={buttonDet.hasSolidColor ? 'solid' : 'clear'}
                            disabled={buttonDet.hasSolidColor ? !this.allFieldsValid() : false}
                            title={buttonDet.buttonTitle}
                            buttonStyle={styles.buttonStyle}
                            key={key}
                            onPress={() => { buttonDet.onPressFunc(this.extractValues()) }}
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
        justifyContent: 'center',

    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        margin: 10
    },
    formComponent: {
        marginBottom: 30,
    },
    buttonStyle: {
        marginBottom: 10,
        height: 54
    }
});

