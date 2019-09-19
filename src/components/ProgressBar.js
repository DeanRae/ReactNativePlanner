import React, { Component } from 'react';
import { ProgressViewIOS, Text, View } from 'react-native';
import { Slider } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from '../components/utils/globalStyles';

export default class ProgressBar extends Component {

    renderProgressBar = (value) => {
        return (
            <View>
                <Text style={styles.barLabel}>
                    Completion Rate: {value*100}%
                </Text>
                <View style={styles.progressBar}>
                    <ProgressViewIOS progress={value} style={styles.progressBarHeight} progressTintColor={styles.barColors.color} />
                </View>
            </View>
        );
    }

    renderSliderBar = (value, onChangeFunc) => {
        return (
            <View>
                <Text style={styles.barLabel}>Completion Rate</Text>
                <View style={styles.sliderBar}>
                    <Text style={styles.barText}>{value*100}</Text>
                    <Slider
                        value={value}
                        style={{ width: 280 }} 
                        minimumTrackTintColor={styles.barColors.color}
                        thumbStyle={styles.sliderThumbStyle}
                        step = {0.1}
                        onValueChange={(val) => {onChangeFunc(val)}}
                    />
                    <Text style={styles.barText}>100</Text>
                </View>
            </View>
        );
    }

    render() {
        const { disabled, label, onChangeFunc } = this.props;

        return (
            disabled ? this.renderProgressBar(label, value, onChangeFunc) :
                this.renderSliderBar()
        );
    }
}

ProgressBar.propTypes = {
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    label: PropTypes.string,
    onChangeFunc: PropTypes.func,
}
