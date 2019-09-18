import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { updatePassword, updateUserEmail, updateUserName, errorDisplayed, logoutUser } from '../actions/user/auth';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Input } from 'react-native-elements';
import { Button } from 'native-base';


const fields = {
  name: '',
  email: '',
  password: '',
}
class ProfileScreen extends Component {

  static navigationOptions = () => ({
    title: 'Profile Settings'
  });

  constructor(props) {
    super(props);

    const visibleState = {};
    Object.keys(fields).forEach((key) => { visibleState[key] = false });

    this.state = {
      ...fields,
      visibleState: {
        ...visibleState
      }
    };
  }

  componentDidUpdate = (prevProps) => {

    if (!this.props.restoring && !this.props.logged && !this.props.loading) {
      this.props.navigation.navigate('AuthLoading');
    }

    if (this.props.error) {
      Alert.alert(
        'User Profile Error',
        this.props.error,
      );

      this.props.errorDisplayed();
    }
  }

  toggleOpacity = (fieldName) => {
    const visibleState = {
      ...this.state.visibleState,
      fieldName: !this.state.visibleState[fieldName]
    }

    this.setState({ visibleState });
  }

  getUserProfileValues = (fieldName) => {
    switch (fieldName) {
      case 'name':
        return this.props.user.displayName ? this.props.user.displayName : 'Click here to update your name';
      case 'email':
        return this.props.user.email;
      default:
        return 'Click here to update your ' + fieldName;
    }
  }

  render() {
    return (
      <KeyboardAwareScrollView
        contentContainerStyle={styles.parentView}
        resetScrollToCoords={{ x: 0, y: 0 }}
      >
        {this.props.loading ? (
          <LoadingIndicator />
        ) : (
            <SafeAreaView style={styles.centered}>
              
            </SafeAreaView>
          )}

      </KeyboardAwareScrollView>

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

const mapStateToProps = ({ auth: { sessionLoading, sessionError, user, restoring, logged } }) => ({
  loading: sessionLoading,
  error: sessionError,
  user: user,
  restoring,
  logged
});

const mapDispatchToProps = {
  updatePassword,
  updateUserEmail,
  updateUserName,
  errorDisplayed,
  logout: logoutUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileScreen)
