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
import SettingsScreen from "../screens/SettingsScreen";
import DeckScreen from "../screens/DeckScreen";
import MapScreen from "../screens/MapScreen";
import ReviewScreen from "../screens/ReviewScreen";
import WelcomeScreen from "../screens/WelcomeScreen";

const AppNavigator = createBottomTabNavigator({
  welcome: { screen: WelcomeScreen, navigationOptions: { tabBarVisible: false }},
  auth: { screen: AuthScreen, navigationOptions: { tabBarVisible: false } },
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
          title: 'Jobs', 
          tabBarIcon: ({ focused, tintColor }) => {
            return <Icon name="description" size={30} color={tintColor} />
          }
        } 
      },
      review:{
        navigationOptions: {
          title: 'Review Jobs',
          tabBarIcon: ({ tintColor }) => {
            return (<Icon name='favorite' size={30} color={tintColor} />)
          }
        },
        screen: createStackNavigator({
          review: { screen: ReviewScreen },
          settings: { screen: SettingsScreen, navigationOptions: { tabBarVisible: true } }
        })
      }
    }, {
      tabBarPosition: 'bottom',
      tabBarOptions: {
        labelStyle: { fontSize: 12 }
      }
    })
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