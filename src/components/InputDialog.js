import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import Dialog from "react-native-dialog";
import {createTitleFromFieldName} from './utils/textTransformations';

export default class InputDialog extends Component {
    render() {
        return (
            <View>
                <Dialog.Container visible={this.props.isVisible}>
                    <Dialog.Title>{this.props.title}</Dialog.Title>

                    {Object.entries(this.props.inputs).map((field, key) => {
                         const isPassword = field[0].toLowerCase().includes("password");
                        return <Dialog.Input
                            label={createTitleFromFieldName(field[0])}
                            secureTextEntry={isPassword}
                            autoCompleteType={isPassword ? 'password' : field[0]}
                            autoFocus={key==0 ? true :false}
                            onChangeText={newInput => {
                                this.props.onChangeFunc(field[0], newInput);
                            }}
                            value = {field[1]}
                            clearButtonMode='while-editing'
                            key={key}
                        />
                    })}

                    <Dialog.Button label="Cancel" onPress={() => { this.props.onCancelFunc() }} />
                    <Dialog.Button label="Save"onPress={() => { this.props.onSaveFunc() }} />
                </Dialog.Container>
            </View>

        );
    }
}

InputDialog.propTypes = {
    title: PropTypes.string.isRequired,
    inputs: PropTypes.objectOf(PropTypes.string).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onSaveFunc: PropTypes.func.isRequired,
    onChangeFunc: PropTypes.func.isRequired,
    onCancelFunc: PropTypes.func.isRequired,
}