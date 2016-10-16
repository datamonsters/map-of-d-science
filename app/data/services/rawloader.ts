import A from "alak";

import DataStream from "./datastream";
let jsonRaw = new DataStream(JSON.parse)

var config = {
    apiKey: "AIzaSyChHe6-FXscOhS-kEKPwbw6wsNdgGkSDcY",
    authDomain: "map-of-scince.firebaseapp.com",
    databaseURL: "https://map-of-scince.firebaseio.com",
    storageBucket: "map-of-scince.appspot.com",
    messagingSenderId: "414788332482"
};
firebase.initializeApp(config);

let infoGraphs = new DataStream(JSON.parse)
infoGraphs.load("https://map-of-scince.firebaseio.com/infographs.json")

const raw = {
    jsonRaw: jsonRaw,
    infoGraphs: infoGraphs
}
export default raw