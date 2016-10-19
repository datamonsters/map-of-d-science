import A from "alak";

import DataStream from "./datastream";
import state from "../state";
import {InfoGraph} from "../classes/infograph.class";
let jsonRaw = new DataStream(JSON.parse)

var config = {
    apiKey: "AIzaSyChHe6-FXscOhS-kEKPwbw6wsNdgGkSDcY",
    authDomain: "map-of-scince.firebaseapp.com",
    databaseURL: "https://map-of-scince.firebaseio.com",
    storageBucket: "map-of-scince.appspot.com",
    messagingSenderId: "414788332482"
};
firebase.initializeApp(config);


const raw = {
    infoGraphsStream: () => {
        const stream = A.start()
        let infoGraphs = new DataStream(JSON.parse)
        infoGraphs.load("https://map-of-scince.firebaseio.com/infographs.json")
        infoGraphs.on(list => {
                stream(R.mapObjIndexed((i => new InfoGraph(i)),list))
            }
        )
        return stream
    }
}
export default raw