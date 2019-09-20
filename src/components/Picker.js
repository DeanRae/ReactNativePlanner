import React, { Component } from 'react';
import { View, ViewPropTypes, Text, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import RNPickerSelect, { defaultStyles } from 'react-native-picker-select';
import PropTypes from 'prop-types';
import styles from '../components/utils/globalStyles';

/**
 * Create an input looking button that when clicked brings up a picker. 
 * The options for the picker are supplied as props (required), as well as 
 * as a label (required) and optionally an icon and function that will be 
 * used as a button on the side.
 */
export default class Picker extends Component {

    render() {

    }
}

Picker.propTypes = {
    label: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
    value: PropTypes.string.isRequired,
    onChangeFunc: PropTypes.func.isRequired,
    buttonName: PropTypes.string,
    buttonFunc: PropTypes.func,
    style: ViewPropTypes.style
}
