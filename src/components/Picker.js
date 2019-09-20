import React, { Component } from 'react';
import { View, ViewPropTypes, Text, TouchableWithoutFeedback, TouchableOpacity, TextInput, InputAccessoryView, Dimensions, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
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

    constructor(props) {
        super(props);

        this.inputRefs = {
            picker: null
        };

        this.state = {
            text: ''
        }
    }
    /**
     * Renders a label on the right side and a text button on the left side
     * of the bar above the picker.
     */
    inputAccessoryView = () => {

        const { inputAccessoryLabel, buttonName, buttonFunc } = this.props;

        return (

            <View style={defaultStyles.modalViewMiddle}>
                <View style={styles.pickerInputAccessory} >
                    <TextInput style={{
                        paddingLeft: 10,
                    }} placeholder="Add new task list..." onChangeText={(newInput) => { this.setState({ text: newInput }) }} autoCorrect={false} />
                </View>
                <TouchableOpacity
                    onPress={() => {
                        buttonFunc();
                    }}
                    hitSlop={{ top: 4, right: 4, bottom: 4, left: 4 }}>
                    <View>
                        <Text style={defaultStyles.done}>{buttonName}</Text>
                    </View>
                </TouchableOpacity>
            </View>






        );
    }

    render() {
        const { label, options, value, onChangeFunc, placeholder, inputAccessoryLabel, buttonName, buttonFunc } = this.props;
        return (
            <View style={styles.pickerContainer}>
                <Text style={styles.label}>{label}</Text>
                <RNPickerSelect
                    placeholder={{ ...placeholder, color: '#9EA0A4' }}
                    items={options}
                    onValueChange={(value) => onChangeFunc(value)}
                    InputAccessoryView={
                        inputAccessoryLabel && buttonName && buttonFunc ?
                            this.inputAccessoryView :
                            null
                    }
                    value={value}
                    style={styles}
                    Icon={() => { return <Icon name='ios-arrow-down' color='#43484d' size={24} /> }}
                />
            </View>
        );
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
    inputAccessoryLabel: PropTypes.string.isRequired,
    buttonName: PropTypes.string,
    buttonFunc: PropTypes.func,
    placeholder: PropTypes.exact({
        label: PropTypes.string.isRequired,
        value: PropTypes.any.isRequired
    }),
}
