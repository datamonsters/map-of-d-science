import state from "../state";
import firebase from "firebase";
var config = {
    apiKey: "AIzaSyChHe6-FXscOhS-kEKPwbw6wsNdgGkSDcY",
    authDomain: "map-of-scince.firebaseapp.com",
    databaseURL: "https://map-of-scince.firebaseio.com",
    storageBucket: "map-of-scince.appspot.com",
    messagingSenderId: "414788332482"
};
firebase.initializeApp(config);


const writer = {
    writeEx(exdata){
        console.log(exdata)
        let g = state.dataSet.data()
        firebase.database().ref("exception").push({
            ex: exdata,
            id: g.info.id,
            name: g.info.name,
            nav: window.navigator.userAgent,
            time: new Date().getTime()
        })
    },
    writeCoords(){
        let g = state.dataSet.data()
        let coords = {}
        g.nodes.forEach(n => coords[n.id] = {
                id: n.id,
                x: n.x,
                y: n.y
            }
        )

        firebase.database().ref("coords/" + g.info.id + "/").push({
            coords: coords,
            id: g.info.id,
            name: g.info.name,
            nav: window.navigator.userAgent,
            time: new Date().getTime()
        })
    }
}

export default writer