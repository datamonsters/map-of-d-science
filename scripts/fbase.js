const firebase = require("firebase")

// Initialize Firebase
var config = {
    apiKey: "AIzaSyChHe6-FXscOhS-kEKPwbw6wsNdgGkSDcY",
    authDomain: "map-of-scince.firebaseapp.com",
    databaseURL: "https://map-of-scince.firebaseio.com",
    storageBucket: "map-of-scince.appspot.com",
    messagingSenderId: "414788332482"
};
firebase.initializeApp(config)

exports.newData = (data) => {
    firebase.database().ref("maindata").set(data);
}