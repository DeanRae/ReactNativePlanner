import React, { Component } from 'react';
import { Alert } from 'react-native';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { loginUser, errorDisplayed, restoreSession } from '../actions/user/auth';
import AuthForm from '../components/AuthForm';
class LoginScreen extends Component {

  static navigationOptions = () => ({
    title: 'Login'
  });

  componentDidUpdate = (prevProps) => {
    if (this.props.user && !this.props.error && this.props.logged) {
      this.props.navigation.navigate('App');
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
    this.props.login(data);
  }

  render() {
    const buttonDetails = [{
      buttonTitle: 'Login',
      hasSolidColor: true,
      onPressFunc: this.onSubmit
    },
    {
      buttonTitle: 'Forgot Password?',
      hasSolidColor: false,
      onPressFunc: () => { this.props.navigation.navigate('ResetPassword') }
    },
    {
      buttonTitle: 'Sign up',
      hasSolidColor: false,
      onPressFunc: () => { this.props.navigation.navigate('Signup') }
    }
    ];

    const fields = {
      email: '',
      password: '',
    };

    return (
      this.props.loading ?
        <LoadingIndicator /> :
        <AuthForm fields={fields} initErrors={fields} buttonDetails={buttonDetails} />
    );
  }
}

const mapStateToProps = ({ auth: { sessionLoading, sessionError, restoring, user, logged } }) => ({
  loading: sessionLoading,
  error: sessionError,
  restoring: restoring,
  user: user,
  logged: logged
});

const mapDispatchToProps = {
  login: loginUser,
  restore: restoreSession,
  errorDisplayed
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
