import React, { Component } from "react";
import { connect } from "react-redux";
import { Icon } from 'react-native-elements';
import * as actions from "../actions";
import {
  createBottomTabNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";

import AuthScreen from "../screens/AuthScreen";

//import WelcomeScreen from '../screens/WelcomeScreen';
import WelcomeScreen from '../screens/WelcomeScreen2';

import SettingsScreen from "../screens/SettingsScreen";
import DeckScreen from "../screens/DeckScreen";
import MapScreen from "../screens/MapScreen";
import ReviewScreen from "../screens/ReviewScreen";
import AuthScreenFacebook from "../screens/AuthScreenFacebook";

//import UserProfile from "../screens/UserProfile";
import UserProfile from "../screens/UserProfile2";

import StoreScreen from "../screens/StoreScreen";

import UserForm from '../screens/UserForm';

const AppNavigator = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen, navigationOptions: { tabBarVisible: false }},
  auth: { screen: AuthScreen, navigationOptions: { tabBarVisible: false } },
  user_form: { screen: UserForm, navigationOptions: { tabBarVisible: false } },
  main: {
    navigationOptions: { tabBarVisible: false },
    screen: createBottomTabNavigator({
      map: { 
        screen: MapScreen, 
        navigationOptions: { 
          tabBarVisible: true, 
          title: 'Map', 
          tabBarIcon: ({ focused, tintColor }) => {
            return <Icon name="my-location" size={30} color={tintColor} />
          }
        } 
      },
      deck: { 
        screen: DeckScreen, 
        navigationOptions: { 
          tabBarVisible: true, 
          title: 'Matchmaker', 
          tabBarIcon: ({ focused, tintColor }) => {
            return <Icon name="favorite" size={30} color={tintColor} />
          }
        } 
      },
      review:{
        navigationOptions: {
          title: 'Matches',
          tabBarIcon: ({ tintColor }) => {
            return (<Icon type="material-community" name='dog' size={30} color={tintColor} />)
          }
        },
        screen: createStackNavigator({
          review: { screen: ReviewScreen },
          settings: { screen: SettingsScreen, navigationOptions: { tabBarVisible: true } }
        })
      },
      store:{
        navigationOptions: {
          title: 'Store',
          tabBarIcon: ({ tintColor }) => {
            return (<Icon type="material-community" name='treasure-chest' size={30} color={tintColor} />)
          }
        },
        screen: StoreScreen
      }
    }, {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    })
  },
  user_profile: {
    screen: createStackNavigator({
      // map: { screen: MapScreen, navigationOptions: { tabBarVisible: false } },
      user_profile: { screen: UserProfile }
    }), 
        navigationOptions: { 
          tabBarVisible: false, 
          title: 'User Profile', 
           tabBarIcon: ({ focused, tintColor }) => {
            return <Icon name="favorite" size={30} color={tintColor} />
          }
        } 
  }
}, {
    navigationOptions: { 
        tabBarVisible: false
    },
    lazy: true
});



const AppContainer = createAppContainer(AppNavigator);


class AppNavigation extends Component {
  render() {
    return <AppContainer screenProps={this.props} />;
  }
}

export default connect(null, actions)(AppNavigation);