import React, { Component } from 'react';
import {
  View,
  ActivityIndicator,
  TextInput,
  SafeAreaView,
  Alert
} from 'react-native';
import { Button, Text, Icon } from 'react-native-elements';

import Styles from '../constants/Styles';
var moment = require('moment');
import Util from '../util/Util';
import SellerInfoModal from './SellerInfoModal';
import { TouchableOpacity } from 'react-native-gesture-handler';


/**
 * Search view
 */
export default class Search extends React.Component {


  state = {
    loading: false,
    showModal: false,
    searchValue:"",
    sellerResults:[]
  }

  async componentDidMount() {

  }

  onRefresh() {
  }

  async search() {
    if (!(/^\d{10}$/.test(this.state.searchValue))) {
      Alert.alert("Erreur", "Merci d'entrer un numéro de téléphone valide")
      return;
    }
    this.setState({ loading: true })


    var sellerResults = await Util.searchForSellerData(this.state.searchValue)

    if (sellerResults)
    {
      console.log(sellerResults)
      this.setState({ sellerResults:sellerResults,showModal:true })
    }
    else
    {
      Alert.alert("Vendeur introuvable","Aucun vendeur n'a été trouvé, nous vous invitons à l'ajouter vous même après la vente :)");
      this.setState({ loading: false });
    }

  }


  render() {
    const { loading } = this.state;

    if (!loading) {
      return (
        <SafeAreaView style={Styles.containerSearchView}>
          <View behavior="padding">
            <Text style={{
              fontSize: 20,
              fontWeight: "800",
              marginBottom: 5,
              marginLeft: 10,
              marginRight: 10,
              textAlign: 'center',
              color: '#3a4860',
            }}>Rechercher un vendeur</Text>
            <TextInput
              placeholder="N° de téléphone"
              maxLength={10}
              keyboardType={'phone-pad'}
              style={{
                height: 43,
                fontSize: 14,
                borderRadius: 5,
                borderWidth: 1,
                borderColor: '#eaeaea',
                backgroundColor: '#fafafa',
                paddingLeft: 10,
                marginLeft: 15,
                marginRight: 15,
                marginTop: 5,
                marginBottom: 5
              }}
              onChangeText={data => this.setState({ searchValue: data })}
              value={this.state.searchValue}
            />
            <TouchableOpacity
              style={{ marginTop: 12, width: "100%" }}
              onPress={() => this.search()}>
              <View style={Styles.buttonSubmit}>
                <Text
                  style={Styles.buttonText}
                >Rechercher
                  </Text>
              </View>
            </TouchableOpacity>
          </View>

        </SafeAreaView>
      )
    } else {
      return (<View style={Styles.container} behavior="padding">
        <ActivityIndicator size="large" color="black" style={Styles.activityIndicator} />
        <SellerInfoModal sellerResults={this.state.sellerResults} showModal={this.state.showModal} onQuit={() => {
          this.setState({showModal:false,loading:false});
        }}/>

      </View>);
    }
  }
}
