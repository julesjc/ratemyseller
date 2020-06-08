import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  SafeAreaView,
  Picker,
  Alert
} from 'react-native';
import { Text, Icon } from 'react-native-elements';

import Styles from '../constants/Styles';
var moment = require('moment');
import Util from '../util/Util';
import PropTypes from 'prop-types';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import { TextInput } from 'react-native-paper';
import StarRating from 'react-native-star-rating';
import FirebaseDbService from '../services/FirebaseDbService';



/**
 * Rate view
 */
export default class Rate extends React.Component {

  sites = ["Autre", "Leboncoin", "Facebook Marketplace","ParuVendu","Kicherchekoi","gensdeconfiance"];

  static propTypes = {
    navigation: PropTypes.object.isRequired
  }

  state = {
    loading: false,
    sellerRate: 0,
    sellerPhone: "",
    sellerRateDesc: "",
    sellerSite: "none"
  }

  async componentDidMount() {

  }

  async sendRating() {
    if (!(/^\d{10}$/.test(this.state.sellerPhone))) {
      Alert.alert("Erreur", "Merci d'entrer un numéro de téléphone valide")
      return;
    }
    if (this.state.sellerRate == 0) {
      Alert.alert("Erreur", "Merci d'évaluer le vendeur")
      return;
    }
    if (this.state.sellerSite == "none") {
      Alert.alert("Erreur", "Merci de saisir le site du vendeur")
      return;
    }
    if (this.state.sellerRateDesc.length <= 2) {
      Alert.alert("Erreur", "Merci de saisir une courte description")
      return;
    }


    
    this.setState({ loading: true })

    var userData = await FirebaseDbService.getUserData().catch(function (error) {
      Alert.alert("Erreur", "Merci de vérifier votre connexion");
      this.resetView();
      return;
    });;

    if (userData.data() && userData.data().sellersRated && userData.data().sellersRated.includes(this.state.sellerPhone)) {
      Alert.alert("Erreur", "Vous avez déjà enregistré un vote sur ce numéro")
      this.resetView();
      return;
    }

    if (userData.data() && userData.data().phone == this.state.sellerPhone) {
      Alert.alert("Erreur", "Vous ne pouvez pas vous déclarer vous même")
      this.resetView();
      return;
    }


    let phone = this.state.sellerPhone;

    await FirebaseDbService.addSellerData(
      this.state.sellerPhone,
      this.state.sellerRate,
      this.state.sellerRateDesc,
      this.state.sellerSite
    ).then(async () => {
      await FirebaseDbService.addSellerRatedToUser(phone)
        .then(() => { Alert.alert("Succès", "Votre déclaration est enregistrée"); })
        .catch(function (error) {
          throw error;
        });
    })
      .catch(function (error) {
        console.log(error)
        Alert.alert("Erreur", "Erreur d'ajout du vendeur");
      });

    this.resetView();
  }

  resetView()
  {
    this.setState({
      loading: false,
      sellerRate: 0,
      sellerPhone: "",
      sellerRateDesc: "",
      sellerSite: "none"
    });
  }

  render() {
    const { loading } = this.state;

    if (!loading) {

      return (
        <SafeAreaView >
          <ScrollView contentContainerStyle={{ padding: 15 }} behavior="padding">
            <Text style={{
              fontSize: 20,
              fontWeight: "800",
              marginTop: 16,
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
              textAlign: 'center',
              color: '#3a4860',
            }}>Ajouter un vendeur</Text>
            <TextInput
              label="N° du vendeur"
              maxLength={10}
              keyboardType={'phone-pad'}
              style={{
                height: 64,
                fontSize: 14,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#eaeaea',
                backgroundColor: '#fafafa',
                marginLeft: 15,
                marginRight: 15,
                marginTop: 5,
                marginBottom: 5
              }}
              onChangeText={data => this.setState({ sellerPhone: data })}
              value={this.state.sellerPhone}
            />
            <TextInput
              autoCapitalize="sentences"
              multiline={true}
              label="Dites nous ce qui s'est passé"
              maxLength={256}
              style={{
                height: 256,
                fontSize: 14,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#eaeaea',
                backgroundColor: '#fafafa',
                marginLeft: 15,
                marginRight: 15,
                marginTop: 5,
                marginBottom: 5,

              }}
              onChangeText={data => this.setState({ sellerRateDesc: data })}
              value={this.state.sellerRateDesc}
            />
            <Picker selectedValue={this.state.sellerSite} onValueChange={sellerSite => this.setState({ sellerSite: sellerSite })}>
              {this.sites.map((x, i) =>
                <Picker.Item label={x} value={x} key={i} />
              )}
            </Picker>

            <Text style={{
              fontSize: 15,
              fontWeight: "800",
              marginBottom: 5,
              textAlign: 'center',
              color: '#3a4860',
            }}>Note</Text>
            <StarRating
              disabled={false}
              emptyStar={'ios-star-outline'}
              fullStar={'ios-star'}
              halfStar={'ios-star-half'}
              iconSet={'Ionicons'}
              maxStars={5}
              rating={this.state.sellerRate}
              selectedStar={(rating) => this.setState({
                sellerRate: rating
              })}
              fullStarColor={'black'}
            />
            <TouchableOpacity
              style={{ marginTop: 20, width: "100%" }}
              onPress={() => this.sendRating()}>
              <View style={Styles.buttonSubmit}>
                <Text
                  style={Styles.buttonText}
                >Ajouter
                  </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>

        </SafeAreaView>)
    } else {
      return (<View style={Styles.container} behavior="padding">
        <ActivityIndicator size="large" color="black" style={Styles.activityIndicator} />
      </View>);
    }
  }


}
