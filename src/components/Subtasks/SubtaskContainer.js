import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SubtaskContainer {

    render() {
        return (
            
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

}
