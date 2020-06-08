import React from 'react';
import Styles from '../constants/Styles';
import { View, Modal, Text, SafeAreaView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import Firebase from 'firebase';
import PropTypes from 'prop-types';
import FirebaseDbService from '../services/FirebaseDbService';




export default class SMSSignInModal extends React.Component {

  userPhone;

  static propTypes = {
    //callback qui ferme la modal si l'utilisateur quitte sans finir le questionnaire ou qu'il n'est pas éligile
    onQuit: PropTypes.func.isRequired,
    onLoggedIn: PropTypes.func.isRequired,
    showModal: PropTypes.bool.isRequired,
  }

  state = {
    phone:"",
    code:"",
    verificationId:""
  };

  sendVerification = () => {
    if (!(/^\d{10}$/.test(this.state.phone))) {
      Alert.alert("Erreur", "Merci d'entrer un numéro de téléphone valide")
      return;
    }

    const phoneProvider = new Firebase.auth.PhoneAuthProvider();
    phoneProvider
      .verifyPhoneNumber("+33" + this.state.phone, this.refs.recaptchaVerifier)
      .then((v) =>{ 
        this.setState({verificationId:v})
        this.userPhone = this.state.phone;
        Alert.alert("Un code vous a été envoyé")
      }).catch((error) => {
          Alert.alert("Erreur", error.message)
        }
      );
  };
  
  // Function to be called when confirming the verification code that we received
  // from Firebase via SMS
  confirmCode = () => {
    if (!this.state.verificationId)
      return;
    const credential = Firebase.auth.PhoneAuthProvider.credential(
      this.state.verificationId,
      this.state.code
    );
    Firebase
      .auth()
      .signInWithCredential(credential)
      .then(async (result) => {
        await FirebaseDbService.addPhoneToUser(this.userPhone).catch(() =>
        {
          Alert.alert("Erreur","Erreur de connexion de l'utilisateur.")
          Firebase.auth().signOut();
          return;
        }
        )
        this.props.onLoggedIn();
      }).catch((error) => {
        Alert.alert("Erreur", error.message)
      }
    );
  }

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
          <Text style={{ color: '#fff', alignSelf: 'center' }}>Connexion</Text>
          <Icon
            name='close'
            type='antdesign'
            color='#000000'
            style={{ alignSelf: 'flex-end' }}
          />
        </SafeAreaView>
        <View style={Styles.containerCenteredView}>
          <Text style={{
            fontSize: 20,
            fontWeight: "800",
            marginBottom: 5,
            marginLeft: 10,
            marginRight: 10,
            textAlign: 'center',
            color: '#3a4860',
          }}>Entrez votre numéro de téléphone</Text>
          <TextInput
            placeholder=""
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
            onChangeText={data => this.setState({ phone: data })}
            value={this.state.phone}
          />
          <TouchableOpacity
            style={{ marginTop: 12, width: "100%" }}
            onPress={() => this.sendVerification()}>
            <View style={Styles.buttonSubmit}>
              <Text
                style={Styles.buttonText}
              >Demander un code
                  </Text>
            </View>
          </TouchableOpacity>

          <Text style={{
            fontSize: 20,
            fontWeight: "800",
            marginBottom: 5,
            marginTop: 20,
            marginLeft: 10,
            marginRight: 10,
            textAlign: 'center',
            color: '#3a4860',
          }}>Entrez votre code de validation</Text>
          <TextInput
            placeholder=""
            maxLength={6}
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
            onChangeText={data => this.setState({ code: data })}
            value={this.state.code}
          />
          <FirebaseRecaptchaVerifierModal
            ref="recaptchaVerifier"
            firebaseConfig={Firebase.app().options}
          />
          <TouchableOpacity
            style={{ marginTop: 12, width: "100%" }}
            onPress={() => this.confirmCode()}>
            <View style={Styles.buttonSubmit}>
              <Text
                style={Styles.buttonText}
              >Se connecter
                  </Text>
            </View>
          </TouchableOpacity>
        </View>
      </Modal>);
  }


}

