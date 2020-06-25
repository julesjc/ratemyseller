import React, {Component} from 'react';
import {StackActions, NavigationActions} from 'react-navigation';
import Styles from '../constants/Styles';
import Firebase from 'firebase';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import {SplashScreen} from 'expo';
import * as Font from 'expo-font';
import SMSSignInModal from '../components/SMSSignInModal';

/**
 * Login screen
 */
export default class LoginScreen extends React.Component {

  state = {
    loading: true,
    showModal: false,
  };

  async componentDidMount() {


    //if user already connected go to main screen
    var onlyOnce = Firebase.auth().onAuthStateChanged(async (user) => {
      onlyOnce();
      if (user) {
        this.goToMain()
      } else {
        //SplashScreen.hide();
        this.setState({loading: false})
      }
    });
  }

  async goToMain() {

    //prevent going back form main screen
    const resetActions = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'Main'})],
    });
    this.props.navigation.dispatch(resetActions);
  }

  render() {
    if (!this.state.loading)
      return (
        <SafeAreaView style={{flex: 1}}>
          <View style={Styles.loginScreenContainer} behavior="padding">
            <View style={{
              marginTop: 64
            }}>
              <View style={{
                flexDirection: "row",
                alignItems: "center"
              }}>
                 <Text style={{
                  fontSize: 32,
                  color: "white",
                  lineHeight: 40,
                  paddingLeft: 20,
                  paddingRight: 20
                }}>
                  Bienvenue dans Rate My Seller
                </Text>

              </View>
            </View>
            <View style={{marginBottom: 53}}>
            <Text style={{
                  fontSize: 16,
                  color: "white",
                  lineHeight: 40,
                  paddingLeft: 20,
                  paddingRight: 20
                }}>
                  Incrivez-vous pour oeuvrer pour un monde sans arnaques
                </Text>
              <TouchableOpacity
                style={{marginTop: 12, width: "100%"}}
                onPress={() => this.setState({showModal:true,loading: true})}>
                <View style={Styles.googleButton}>
                  <Text
                    style={Styles.buttonText}
                  >Se connecter
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      );
    else
      return (<View style={Styles.container} behavior="padding">
        <ActivityIndicator size="large" color="black" style={Styles.activityIndicator}/>
        <SMSSignInModal onQuit={() => {
          this.setState({showModal:false,loading:false});
        }}
        onLoggedIn={() => {
          this.setState({showModal:false,loading:false});
          this.goToMain();
        }}
        showModal={this.state.showModal}/>
      </View>);
  }

}