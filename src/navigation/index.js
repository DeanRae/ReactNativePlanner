import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

/**
 * Create navigation that's only accessible once authenticated 
 */
const AppNav = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    })
  }
);

/**
 * Create navigation that's only accessible when unauthenticated
 */
const AuthNav = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen
  }
);

/**
 * Create's an icon used in the tab menu based on the route
 * @param {*} navigation 
 * @param {*} focused 
 * @param {*} tintColor 
 */
const getTabBarIcon = (navigation, focused, tintColor) => {
  const { routeName } = navigation.state;
  let IconComponent = Ionicons;
  let iconName;

  switch (routeName) {
    case 'Home':
      iconName = 'ios-home';
      break;
    case 'Profile':
      iconName = 'ios-person';
      break;
  }

  return <IconComponent name={iconName} size={25} color={tintColor} />;
};

/**
 * Combines all of the navigation
 */
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