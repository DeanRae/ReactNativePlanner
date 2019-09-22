import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SubtaskContainer {

    render() {
        return (
            <View>
                <View 
            </View>
        );
    }

}

Picker.propTypes = {
    subtasks: PropTypes.arrayOf(
        PropTypes.shape({
            isChecked: PropTypes.bool.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    onChangeFunc: PropTypes.func.isRequired,
    inputAccessoryLabel: PropTypes.string.isRequired,
    buttonName: PropTypes.string,
    buttonFunc: PropTypes.func,
    placeholder: PropTypes.exact({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired
    }),
}
