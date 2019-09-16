import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { signupUser, errorDisplayed } from '../actions/user/auth';
import AuthForm from '../components/AuthForm';
class SignupScreen extends Component {
    static navigationOptions = () => ({
        title: 'Sign Up'
    });

    componentDidUpdate = (prevProps) => {
        if (this.props.logged && !this.props.error) {
            this.props.navigation.navigate('App');
        }

        if (this.props.error) {
            Alert.alert(
                'Signup Error',
                this.props.error,
            );

            this.props.errorDisplayed();
        }
    }

    onSubmit = (data) => {
        this.props.signup(data);
    }

    render() {
        const error = {
            email: '',
            password: '',
            confirmPassword: ''
        };
        
        const inputs = {
            email: '',
            password: '',
            confirmPassword: '',
            name: '',
        };

        const buttonDetails = [{
            buttonTitle: 'Signup',
            hasSolidColor: true,
            onPressFunc: this.onSubmit
        }];

        return (
            this.props.loading ? 
            <LoadingIndicator /> : 
            <AuthForm fields = {inputs} initErrors = {error} buttonDetails ={ buttonDetails}/>
        );
    }

}

const mapStateToProps = ({ auth: { sessionLoading, sessionError, logged } }) => ({
    loading: sessionLoading,
    error: sessionError,
    logged: logged
});

const mapDispatchToProps = {
    signup: signupUser,
    errorDisplayed
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SignupScreen);
