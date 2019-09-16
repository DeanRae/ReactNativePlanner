import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

const AppNav = createBottomTabNavigator({ Home: HomeScreen, Profile: ProfileScreen });
const AuthNav = createStackNavigator({ Login: LoginScreen, Signup: SignupScreen });

export default createAppContainer(
  createSwitchNavigator(
    {
      AuthLoading: AuthLoadingScreen,
      App: AppNav,
      Auth: AuthNav,
    },
    {
      initialRouteName: 'AuthLoading',
    }
  )
);