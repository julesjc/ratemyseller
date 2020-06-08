

const FIREBASE_PROD = {
  apiKey: "AIzaSyDqYTTIxBS0csSlmb-yJ1djtyhQVK9ruKE",
  authDomain: "rate-my-seller.firebaseapp.com",
  databaseURL: "https://rate-my-seller.firebaseio.com",
  projectId: "rate-my-seller",
  storageBucket: "rate-my-seller.appspot.com",
  messagingSenderId: "564598126705",
  appId: "1:564598126705:web:1152a651dc861c9a2d83d0"
};


class Config {

  static get FIREBASE() {
    return FIREBASE_PROD;
  }

  static get PRISMIC_API() {
    return PRISMIC_API;
  }

}

module.exports = Config;


