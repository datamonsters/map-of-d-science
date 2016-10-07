import "./components/start";
import "./components/head-up-display";
// import "./utils";
import './components/graph-container'
import './components/rating-table'
// import './components/main'
import state from "./data/state";
state.restore()


var config = {
    apiKey: "AIzaSyChHe6-FXscOhS-kEKPwbw6wsNdgGkSDcY",
    authDomain: "map-of-scince.firebaseapp.com",
    databaseURL: "https://map-of-scince.firebaseio.com",
    storageBucket: "map-of-scince.appspot.com",
    messagingSenderId: "414788332482"
};
firebase.initializeApp(config);