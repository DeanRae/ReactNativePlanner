import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, SafeAreaView } from 'react-native';
import PropTypes from 'prop-types';
import { Input } from 'react-native-elements';

export default class InputDialogButton extends Component {

    constructor(props) {
        super(props);

        const { fields } = props;
        const visibleState = {};
        Object.keys(fields).forEach((key) => { visibleState[key] = false });

        this.state = {
            ...fields,
            visibleState: {
                ...visibleState
            }
        };
    }


    render() {
        return (
            <SafeAreaView style={styles.centered}>
                {Object.keys(this.props.fields).map((field, key) =>
                    <TouchableOpacity
                        onPress={this.toggleOpacity('name')}
                        key={key}
                    >
                        <Input
                            disabled={true}
                            label='Name'
                            value={this.props.user.displayName}
                            rightIcon={{ type: 'font-awesome', name: 'pencil' }}
                            key={key}
                        />
                    </TouchableOpacity>
                    <View>
                        <Dialog.Container visible={this.state.visibleState[field]} key={key}>
                            <Dialog.Title key={key}>Update {field}</Dialog.Title>
                            <Dialog.Input label={field} key={key}/>>
                            <Dialog.Button label="Cancel" key={key} />
                            <Dialog.Button label="Save" key={key} />
                        </Dialog.Container>
                    </View>

              )}
            </SafeAreaView>
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

InputDialogButton.propTypes = {
    fields: PropTypes.objectOf(PropTypes.string).isRequired,
}