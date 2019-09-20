import React, { Component } from 'react';
import { View, ViewPropTypes } from 'react-native';
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
    options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    onChangeFunc: PropTypes.func.isRequired,
    buttonIconName: PropTypes.string,
    buttonFunc: PropTypes.func,
    style: ViewPropTypes.style
}
