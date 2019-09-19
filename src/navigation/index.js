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
import ResetPasswordScreen from '../screens/ResetPasswordScreen'
import CalendarScreen from '../screens/Calendar/CalendarScreen';
import TaskListsScreen from '../screens/TaskListsScreen';
import TaskDetailsScreen from '../screens/TaskDetailsScreen';

const AppTabs = createBottomTabNavigator(
  {
    TaskDetails: TaskDetailsScreen,
    Home: HomeScreen,
    TaskLists: TaskListsScreen,
    Calendar: CalendarScreen,
    Profile: ProfileScreen
  },
  {
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) =>
        getTabBarIcon(navigation, focused, tintColor),
    })
  }
);

AppTabs.navigationOptions = {
  header: null,
}
/**
 * Create navigation that's only accessible once authenticated 
 */
const AppNav = createStackNavigator({
  Tabs: AppTabs,
  TaskDetails: TaskDetailsScreen
});

/**
 * Create navigation that's only accessible when unauthenticated
 */
const AuthNav = createStackNavigator(
  {
    Login: LoginScreen,
    Signup: SignupScreen,
    ResetPassword: ResetPasswordScreen,
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
    case 'Calendar':
      iconName = 'ios-calendar';
      break;
    case 'TaskLists':
      iconName = `ios-checkbox${focused ? '' : '-outline'}`;
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