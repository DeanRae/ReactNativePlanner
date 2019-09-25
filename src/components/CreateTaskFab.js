import React, { Component, } from "react";
import PropTypes from 'prop-types';
import { Icon } from "react-native-elements";

export default class CreateTaskFab extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<Icon
            name='md-create'
            type='ionicon'
            reverse
            color='#007aff'
            size={28}
            raised
            containerStyle={{
                position: 'absolute',
                bottom: 20,
                right: 20,
            }}
            onPress={()=>{this.props.navigation.navigate('CreateTask');}}
        />);
    }
}

CreateTaskFab.propTypes = {
    navigation: PropTypes.any.isRequired
}


