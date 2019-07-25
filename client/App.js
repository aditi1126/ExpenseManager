/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createDrawerNavigator,
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

import WelcomeScreen from '../client/src/components/WelcomeScreen';
import Login from '../client/src/components/Login';
import Favourites from '../client/src/components/Favourites';
import Feed from '../client/src/components/Feed';
import FeedDetail from '../client/src/components/FeedDetail';
import Profile from '../client/src/components/Profile';
import Settings from '../client/src/components/Settings';
import Signup from '../client/src/components/Signup';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });


export default class App extends Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const FeedStackNavigator = createStackNavigator({
  Feed: {
    screen: Feed,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Feed',
      headerLeft: <Icon
        name="md-menu"
        size={30}
        style={{ paddingLeft: 7 }}
        onPress={() => navigation.openDrawer()}
      />,
    })
  },
  FeedDetail
}, {
  defaultNavigationOptions: {
    gesturesEnabled: false,
  }
});

const SettingsStackNavigator = createStackNavigator({
  Settings: {
    screen: Settings,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Settings',
      headerLeft: <Icon
        name="md-menu"
        size={30}
        style={{ paddingLeft: 7 }}
        onPress={() => navigation.openDrawer()}
      />,
    })
  }
});

const ProfileStackNavigator = createStackNavigator({
  Profile: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'Profile',
      headerLeft: <Icon
        name="md-menu"
        size={30}
        style={{ paddingLeft: 7 }}
        onPress={() => navigation.openDrawer()}
      />,
    })
  }
});

const DashboardTabNavigator = createBottomTabNavigator({
  Feed: { screen: FeedStackNavigator },
  Settings: { screen: SettingsStackNavigator },
  Profile: { screen: ProfileStackNavigator }
}, {
  navigationOptions: ({ navigation }) => {
    const { routeName } = navigation.state.routes[navigation.state.index];
    return {
      headerTitle: routeName,
      header: null,
    };
  },
});

const DashboardStackNavigator = createStackNavigator({
  DashboardTabNavigator,
}, {
  defaultNavigationOptions: ({ navigation }) => {
    console.log('navigation: ', navigation, ' params: ', this.props);
    return ({
      headerLeft: <Icon
        name="md-menu"
        size={30}
        style={{ paddingLeft: 7 }}
        onPress={() => navigation.openDrawer()}
      />
    });
  }
});

const FavouritesStackNavigator = createStackNavigator({
  Favourites,
}, {
  defaultNavigationOptions: ({ navigation }) => ({
    headerLeft: <Icon
      name="md-menu"
      size={30}
      style={{ paddingLeft: 7 }}
      onPress={() => navigation.openDrawer()}
    />
  })
});

const AppDrawerNavigator = createDrawerNavigator({
  Dashboard: { screen: DashboardStackNavigator },
  Favourites: { screen: FavouritesStackNavigator },
  Logout: { screen: WelcomeScreen },
}, {
  unmountInactiveRoutes: true,
});

const WelcomeScreenStackNavigator = createStackNavigator({
  Welcome: {
    screen: WelcomeScreen,
    navigationOptions: {
      header: null,
    },
  },
  Login: {
    screen: Login,
  },
  Signup: {
    screen: Signup,
  }
});

const AppSwitchNavigator = createSwitchNavigator({
  Welcome: { screen: WelcomeScreenStackNavigator },
  Dashboard: { screen: AppDrawerNavigator },
});

const AppContainer = createAppContainer(AppSwitchNavigator);
