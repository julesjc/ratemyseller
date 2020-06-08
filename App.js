import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation'; // Version can be specified in package.json
import Firebase from 'firebase';
import Config from './constants/Config.js';
import LoginScreen from './screens/LoginScreen.js';
import MainScreen from './screens/MainScreen.js';

import { View, ActivityIndicator } from 'react-native';
import { SplashScreen } from 'expo';


let config = Config.FIREBASE;

let app = Firebase;

if (!Firebase.apps.length) {
  app = Firebase.initializeApp(config);
}

export const db = app.database();

//SplashScreen.preventAutoHide();

const RootStack = createStackNavigator(
  {
    Login: LoginScreen,
    Main: MainScreen

  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      headerMode: 'none',
      headerVisible: false,
      header: null,

    },
    navigationOptions: {
      headerMode: 'none',
      headerVisible: false,
      header: null,
    },
  }
);

console.disableYellowBox = true;


AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {

  componentDidMount()
  {

  }

  render() {

    return (
      <AppContainer />
    );
  }
}






