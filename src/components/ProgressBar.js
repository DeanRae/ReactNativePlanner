import React, { Component } from 'react';
import { ProgressViewIOS, Text, View } from 'react-native';
import { Slider } from 'react-native-elements';
import PropTypes from 'prop-types';
import styles from '../components/utils/globalStyles';

/**
 * Renders a progress bar or slider depending on the given 
 * disabled prop. If true, only the value needs to be supplied,
 * otherwise a value and an onChangeFunc also needs to be supplied.
 */
export default class ProgressBar extends Component {

    /**
     * Renders a progress bar that only displays a given value.
     */
    renderProgressBar = (value) => {
        return (
            <View>
                <Text style={styles.barLabel}>
                    Completion Rate: {(value*100).toFixed(0)}%
                </Text>
                <View style={styles.progressBar}>
                    <ProgressViewIOS progress={value} style={styles.progressBarHeight} progressTintColor={styles.barColors.color} />
                </View>
            </View>
        );
    }

    /**
     * Renders a slider bar that the user can change the value of
     * using a slider.
     */
    renderSliderBar = (value, onChangeFunc) => {
        return (
            <View>
                <Text style={styles.barLabel}>Completion Rate</Text>
                <View style={styles.sliderBar}>
                    <Text style={styles.barText}>{(value*100).toFixed(0)}</Text>
                    <Slider
                        value={value}
                        style={{ width: 280 }} 
                        minimumTrackTintColor={styles.barColors.color}
                        thumbStyle={styles.sliderThumbStyle}
                        step = {0.01}
                        onValueChange={(val) => {onChangeFunc(val)}}
                    />
                    <Text style={styles.barText}>100</Text>
                </View>
            </View>
        );
    }

    render() {
        const { disabled, value, onChangeFunc } = this.props;

        return (
            disabled ? this.renderProgressBar(value) :
                this.renderSliderBar(value, onChangeFunc)
        );
    }
}

ProgressBar.propTypes = {
    disabled: PropTypes.bool.isRequired,
    value: PropTypes.number.isRequired,
    onChangeFunc: PropTypes.func,
}
