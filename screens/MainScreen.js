import React, { Component } from 'react';
import Styles from '../constants/Styles';
import { BottomNavigation } from 'react-native-paper';
import Rate from '../components/Rate';
import Search from '../components/Search';
import * as Font from 'expo-font';
import { SplashScreen } from 'expo';

/**
 * Main screen
 */
export default class MainScreen extends React.Component {

  componentDidMount() {
    
    //SplashScreen.hide();

    Font.loadAsync({
      'plain': require('../assets/fonts/Plain-Light.ttf'),
      'plainLight': require('../assets/fonts/Plain-Ultralight.ttf'),
      'plainBold': require('../assets/fonts/Plain-Medium.ttf'),
      'icomoon': require('../assets/fonts/icomoon.ttf'),
    });

  }

  state = {
    index: 0,
    routes: [
      { key: 'search', title: 'Rechercher', icon: 'search' },
      { key: 'rate', title: 'Ajouter', icon: 'star' },
    ],
  };


  _handleIndexChange = index => this.setState({ index });

  _renderScene = BottomNavigation.SceneMap({
    rate: () => <Rate navigation={this.props.navigation} />,
    search: () => <Search navigation={this.props.navigation} />

  });

  render() {
    return (
      <BottomNavigation barStyle={{ backgroundColor: '#000000' }}
        navigationState={this.state}
        onIndexChange={this._handleIndexChange}
        renderScene={this._renderScene}
        screenProps={{ navigation: this.props.navigation }}
      />
    );
  }

}
