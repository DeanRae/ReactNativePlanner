import React, { Component } from 'react';
import { StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { TextInput, Button, HelperText } from 'react-native-paper';
import { connect } from 'react-redux';
import { signupUser } from '../actions/user/auth';
import { validate } from '../components/utils/inputValidation';

const error = {
    general: '',
    email: '',
    password: '',
    confirmPassword: ''
}

class SignupScreen extends Component {
    static navigationOptions = () => ({
        title: 'Sign Up'
    });

    constructor() {
        super();
        this.state = {
            email: '',
            password: '',
            error: error
        };
    }

    onSubmit = (data) => {
        this.setState({ error: error }); //clear out error messages

        this.props.signupUser(data)
            .then((data) => {
                console.log("user created");
                console.log(data);
            })
            .catch(this.onError)
    }

    onError = (errorData) => {
        let errObj = {...this.state.error};

        console.log("error obj " ,errObj);

        if (errorData.hasOwnProperty("message")) {
            errObj['general'] = errorData.message;
            console.log("shouldnt be here");
        } else {
            console.log("At error sorting");
            let keys = Object.keys(errorData);
            keys.map((key, index) => {
                errObj[key] = errorData[key];
            })
            console.log(errObj);
        }
        this.setState({ error: errObj });
    }

    validateInput = (fields = { email: this.state.email, password: this.state.password }) => {
        let result = validate(fields);

        if (result) {
            this.onError(result);
        } else {
            this.setState({ error: error}); // reset errors if no validation errors
        }
    }

    render() {
        return (
            <ScrollView contentContainerStyle={styles.parentView} scrollEnabled={false}>
                <SafeAreaView style={styles.centered}>
                    <TextInput
                        mode='outlined'
                        label='Email'
                        keyboardType='email-address'
                        value={this.state.email}
                        autoCompleteType='email'
                        autoCapitalize='none'
                        onChangeText={email => { this.setState({ email }); console.log(email); this.validateInput({ email: email }) }}
                        style={styles.formComponent}
                    />
                    <HelperText
                        type="error"
                        visible={this.state.error.email}
                    >
                        {this.state.error.email}
                    </HelperText>
                    <TextInput
                        mode='outlined'
                        label='Password'
                        secureTextEntry={true}
                        value={this.state.password}
                        autoCompleteType='password'
                        autoCapitalize='none'
                        onChangeText={password => { this.setState({ password }); this.validateInput({ password: password }) }}
                        style={styles.formComponent}
                    />
                    <HelperText
                        type="error"
                        visible={this.state.error.password}
                    >
                        {this.state.error.password}
                    </HelperText>
                    <Button style={styles.formComponent} contentStyle={{ height: 56 }} mode="contained" onPress={() => console.log(error)}>
                        Login
              </Button>

                </SafeAreaView>
            </ScrollView>

        );
    }

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

export default connect(null, { signupUser })(SignupScreen);