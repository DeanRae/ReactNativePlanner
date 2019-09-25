import React, { Component } from 'react';
import { View, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { updatePassword, updateUserEmail, updateUserName, errorDisplayed, logoutUser } from '../actions/user/auth';
import { Input, Button, Header } from 'react-native-elements';
import styles from '../components/utils/globalStyles';
import InputDialog from '../components/InputDialog';
import { createTitleFromFieldName } from '../components/utils/textTransformations';

const fields = {
  name: '',
  email: '',
  password: '',
  newPassword: '',
}

const visibleState = {
  name: false,
  email: false,
  password: false,
};
class ProfileScreen extends Component {

  static navigationOptions = () => ({
    title: 'Profile Settings'
  });

  constructor(props) {
    super(props);

    Object.keys(fields).forEach((key) => {
      if (!key.toLowerCase().includes("password")) {
        fields[key] = this.getUserProfileValues(key);
      }
    });

    this.state = {
      ...fields,
      visibleState: {
        ...visibleState
      }
    };

  }

  componentDidUpdate = (prevProps) => {

    if (!this.props.restoring && !this.props.logged && !this.props.loading) {
      this.props.navigation.navigate('Auth');
    }

    if (this.props.error) {
      Alert.alert(
        'Error',
        this.props.error,
      );

      this.props.errorDisplayed();
    }
  }

  /**
   * Toggles the visibility of the dialogs. 
   */
  toggleVisibility = (fieldName) => {
    const visibleState = {
      ...this.state.visibleState,
      [fieldName]: !this.state.visibleState[fieldName],
    }
    this.setState({ visibleState });
  }

  /**
   * Returns the values of the field based on current profile settings
   */
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

  /**
   * Sets the values of the fields to match what is being inputted in the dialog
   */
  handleInputChange = (fieldName, newInput) => {
    this.setState({ [fieldName === 'oldPassword' ? 'password' : fieldName]: newInput });

  }

  /**
   * Refreshes the state when dialog is canceled
   */
  handleCancel = () => {
    this.setState({ ...fields, visibleState: { ...visibleState } });
  }

  render() {
    return (
      <View style={styles.parentView}>
        <Header
          centerComponent={{ text: 'Profile Settings', style: styles.header }}
          backgroundColor="white"
          containerStyle={styles.headerContainer}
          statusBarProps={{ barStyle: 'dark-content' }}
        />
        {this.props.loading ? (
          <LoadingIndicator />
        ) : (
            <SafeAreaView style={styles.centered}>

              {Object.keys(fields).map((field, key) => {
                if (field == "newPassword") return;
                return <TouchableOpacity
                  onPress={() => { this.toggleVisibility(field) }}
                  style={{ zIndex: 5 }}
                  key={key}
                >
                  <Input
                    disabled={true}
                    pointerEvents="none"
                    label={createTitleFromFieldName(field)}
                    value={this.getUserProfileValues(field)}
                    rightIcon={{ type: 'ionicon', name: 'md-create' }}
                    containerStyle={styles.formComponent}
                    key={key}
                  />
                </TouchableOpacity>
              })}

              <InputDialog
                title="Update Display Name"
                inputs={{ name: this.state["name"] }}
                isVisible={this.state.visibleState["name"]}
                onSaveFunc={() => {                               
                  this.toggleVisibility("name"); 
                  this.props.updateUserName(this.state["name"]); 
                  }}
                onChangeFunc={this.handleInputChange}
                onCancelFunc={this.handleCancel}
              />
              <InputDialog
                title="Update Email Address"
                inputs={{ email: this.state["email"], password: this.state["password"] }}
                isVisible={this.state.visibleState["email"]}
                onSaveFunc={() => { 
                  this.toggleVisibility("email"); 
                  this.props.updateUserEmail(this.state["email"], this.state["password"]); }}
                onChangeFunc={this.handleInputChange}
                onCancelFunc={this.handleCancel}
              />
              <InputDialog
                title="Update Password"
                inputs={{ oldPassword: this.state["password"], newPassword: this.state["newPassword"] }}
                isVisible={this.state.visibleState["password"]}
                onSaveFunc={() => { 
                  this.toggleVisibility("password"); 
                  this.props.updatePassword(this.state["newPassword"], this.state["password"]); }}
                onChangeFunc={this.handleInputChange}
                onCancelFunc={this.handleCancel}
              />
              <Button
                title="Logout"
                onPress={() => { this.props.logout() }}
                buttonStyle={styles.logoutButtonStyle}
              />
            </SafeAreaView>
          )}
      </View>
    );
  }
}

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
