import React, { Component } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

export default class LoadingIndicator extends Component {
  render() {
    return (
      <View style={styles.parentView}>
        <ActivityIndicator color={"gray"} size="large" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parentView: {
    flexGrow: 1,
    justifyContent: 'center'
  },
});
