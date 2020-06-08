
import { React, Component } from 'react';
import
Platform
    from 'react-native';
import Firebase from 'firebase';
import 'firebase/firestore';

/**
 * Service de communication avec firebase
 */
export default class FirebaseDbService {

    static async getSellerByPhone(sellerPhone) {
        return Firebase.firestore().collection("sellers").where("sellerPhone", "==", sellerPhone).get()
    }

    static async addSellerData(sellerPhone, sellerRate, sellerRateDesc, sellerSite) {

        return Firebase.firestore().collection("sellers").add({
            sellerRate: sellerRate,
            sellerPhone: sellerPhone,
            sellerRateDesc: sellerRateDesc,
            sellerSite: sellerSite,
            createdBy: Firebase.auth().currentUser.uid,
            createdAt: Firebase.firestore.FieldValue.serverTimestamp()
        });
    }

    static async addSellerRatedToUser(sellerPhone) {

        return Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).get().then(async (doc) => {
            if (doc.exists)
                return await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).update({
                    sellersRated: Firebase.firestore.FieldValue.arrayUnion(sellerPhone)
                });
            else
                return await Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).set({
                    sellersRated: Firebase.firestore.FieldValue.arrayUnion(sellerPhone)
                });
        })

    }

    static async addPhoneToUser(phone) {

        return Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).set({
            phone: phone
        });

    }

    static async getUserData() {
        return Firebase.firestore().collection("users").doc(Firebase.auth().currentUser.uid).get()
    }

}