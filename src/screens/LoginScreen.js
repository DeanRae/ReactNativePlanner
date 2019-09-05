import React, { Component } from 'react';
import { StyleSheet, View, Text, ScrollView, Keyboard, SafeAreaView } from 'react-native';
import { Appbar, TextInput, Button } from 'react-native-paper';

export default class LoginScreen extends Component {

  static navigationOptions = () => ({
    title: 'Login'
  });
  
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.parentView} scrollEnabled={false}>
        <SafeAreaView style={styles.centered}>
          <TextInput
            mode='outlined'
            label='Email'
            keyboardType="email-address"
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            onBlur={() => Keyboard.dismiss()}
            style={styles.formComponent}
          />
          <TextInput
            mode='outlined'
            label='Password'
            secureTextEntry={true}
            value={this.state.email}
            onChangeText={email => this.setState({ email })}
            onBlur={() => Keyboard.dismiss()}
            style={styles.formComponent}
          />
          <Button style={styles.formComponent} contentStyle={{ height: 56 }} mode="contained" onPress={() => console.log('Pressed')}>
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
