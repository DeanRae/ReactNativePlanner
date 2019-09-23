import React, { Component } from 'react';
import { View, Text, } from 'react-native';
import { Button, CheckBox } from 'react-native-elements';
import Icon from 'react-native-vector-icons/Ionicons';
import PropTypes from 'prop-types';
import styles from './stStyles';
import InputDialog from '../InputDialog';

const initState = {
    isExpanded: false
}
export default class Accordion extends Component {
    
}

Accordion.propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
        title: PropTypes.string.isRequired
    })).isRequired,
    title: PropTypes.string.isRequired,
    expanded: PropTypes.bool.isRequired,
    onTitleEdit: PropTypes.func.isRequired,
    onListDelete: PropTypes.func.isRequired,
    onListItemsDelete: PropTypes.func.isRequired
}