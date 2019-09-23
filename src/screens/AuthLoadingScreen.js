import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from '../components/LoadingIndicator';
import { errorDisplayed, restoreSession } from '../actions/user/auth';
import { getAllTasks } from '../actions/todoManagement/tasks';
import { getAllTaskLists } from '../actions/todoManagement/taskLists';

class AuthLoadingScreen extends Component {

    componentDidMount = () => {
        this.props.restore();
    }

    componentDidUpdate = (prevProps) => {
        if (this.props.user && !this.props.error && this.props.logged) {
            this.props.getAllTasks();
            this.props.getAllTaskLists();
            this.props.navigation.navigate('App');
        }

        if (!this.props.restoring && !this.props.logged && !this.props.loading) {
            this.props.navigation.navigate('Auth');
        }

        if (this.props.error) {
            Alert.alert(
                'Error',
                this.props.error,
            );

            this.props.errorDisplayed();
        }
    }

    render() {
        return (
            <LoadingIndicator />
        );
    }
}

const mapStateToProps = ({ auth: { sessionLoading, sessionError, restoring, user, logged }}) => ({
    loading: sessionLoading,
    error: sessionError,
    restoring: restoring,
    user: user,
    logged: logged
});

const mapDispatchToProps = {
    restore: restoreSession,
    errorDisplayed,
    getAllTaskLists,
    getAllTasks
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AuthLoadingScreen)

