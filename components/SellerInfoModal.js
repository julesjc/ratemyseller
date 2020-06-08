import React from 'react';
import Styles from '../constants/Styles';
import { View, Modal, Text, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import PropTypes from 'prop-types';
import StarRating from 'react-native-star-rating';



export default class SellerInfoModal extends React.Component {

  static propTypes = {
    //callback qui ferme la modal si l'utilisateur quitte sans finir le questionnaire ou qu'il n'est pas éligile
    onQuit: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
    sellerResults: PropTypes.object
  }
  state = {
  };

  //vue de la modal
  render() {

    return (

      <Modal
        animationType="slide"
        transparent={false}
        visible={this.props.showModal}
      >
        <SafeAreaView style={{
          backgroundColor: "#000000", flexDirection: 'row',
          padding: 15,
          justifyContent: 'space-between',
          alignItems: 'center'

        }}>
          <Icon
            name='close'
            type='antdesign'
            color='#ffffff'
            style={{ alignSelf: 'flex-start' }}
            onPress={() => this.props.onQuit()}
          />
          <Text style={{ color: '#fff', alignSelf: 'center' }}>Résultat</Text>
          <Icon
            name='close'
            type='antdesign'
            color='#000000'
            style={{ alignSelf: 'flex-end' }}
          />
        </SafeAreaView>
        <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems:'center',
            padding:15
        }}>
          <Text style={{
            fontSize: 20,
            fontWeight: "800",
            marginBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            textAlign: 'center',
            color: '#3a4860',
          }}>{this.props.sellerResults.name}</Text>
          <FlatList
            data={this.props.sellerResults.reviews}
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
            renderItem={({ item }) =>
              <Text
                style={{
                  letterSpacing: 0.5,
                  fontSize: 20,
                  color: "#707070",
                  marginTop: 10,
                  marginBottom: 10,
                  justifyContent: 'center'
                }}>{item}</Text>
            } />
            {this.props.sellerResults.rating >= 3.5 && <Text style={{
            fontSize: 15,
            fontWeight: "800",
            marginBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            textAlign: 'center',
            color: 'green',
            }}>Ce vendeur semble être fiable d'après {this.props.sellerResults.reviews.length} avis</Text>}
            {this.props.sellerResults.rating < 3.5 && this.props.sellerResults.rating >= 2.5 && <Text style={{
            fontSize: 15,
            fontWeight: "800",
            marginBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            textAlign: 'center',
            color: 'orange',
            }}>Ce vendeur semble être correct d'après {this.props.sellerResults.reviews.length} avis</Text>}
            {this.props.sellerResults.rating < 2.5  && <Text style={{
            fontSize: 15,
            fontWeight: "800",
            marginBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            textAlign: 'center',
            color: 'red',
            }}>Ce vendeur semble être suspect d'après {this.props.sellerResults.reviews.length} avis, ne vous faîtes pas avoir !</Text>}
          <StarRating
            disabled={true}
            emptyStar={'ios-star-outline'}
            fullStar={'ios-star'}
            halfStar={'ios-star-half'}
            iconSet={'Ionicons'}
            maxStars={5}
            rating={this.props.sellerResults.rating}
            fullStarColor={'black'}
          />
          <TouchableOpacity
            style={{ marginTop: 12, width: "100%" }}
            onPress={() => this.props.onQuit()}>
            <View style={Styles.buttonSubmit}>
              <Text
                style={Styles.buttonText}
              >Fermer
                  </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>);
  }


}

