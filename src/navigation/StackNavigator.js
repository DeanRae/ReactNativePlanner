import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import LoginScreen from '../screens/LoginScreen';
import LoadingIndicatorScreen from '../screens/LoadingIndicatorScreen';

const StackNavigator = createStackNavigator(
    {
        Login: LoginScreen,
        LoadingIndicator: LoadingIndicatorScreen,
    },
    {
        initialRouteName: 'LoadingIndicator',
    }
);

export default createAppContainer(StackNavigator);