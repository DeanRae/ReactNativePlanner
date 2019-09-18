import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { resetPassword, alertDisplayed, errorDisplayed } from '../actions/user/auth';
import AuthForm from '../components/AuthForm';
class LoginScreen extends Component {

  static navigationOptions = () => ({
    title: 'Reset Password'
  });

  componentDidUpdate = (prevProps) => {
    if (this.props.resetEmailSent && !this.props.error) {
        Alert.alert(
            'Check your email for a password reset link'
        );

        this.props.alertDisplayed();
        this.props.navigation.goBack();
    }

    if (this.props.error) {
      Alert.alert(
        'Login Error',
        this.props.error,
      );

      this.props.errorDisplayed();
    }
  }

  onSubmit = (data) => {
    this.props.resetPassword(data);
  }

  render() {
    const buttonDetails = [{
      buttonTitle: 'Reset Password',
      hasSolidColor: true,
      onPressFunc: this.onSubmit
    }];

    const fields = {
      email: ''
    };

    return (
      this.props.loading ?
        <LoadingIndicator /> :
        <AuthForm fields={fields} initErrors={fields} buttonDetails={buttonDetails} />
    );
  }
}

const mapStateToProps = ({ auth: { sessionLoading, sessionError, resetPassword } }) => ({
  loading: sessionLoading,
  error: sessionError,
  resetEmailSent: resetPassword
});

const mapDispatchToProps = {
  errorDisplayed,
  alertDisplayed,
  resetPassword
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
