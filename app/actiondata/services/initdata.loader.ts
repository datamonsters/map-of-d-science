import A from "alak";

import DataStream from "./datastream";
import state from "../state";
import {InfoGraph} from "../classes/infograph.class";
let jsonRaw = new DataStream(JSON.parse)


const raw = {
    infoGraphsStream: () => {
        const stream = A.start()
        let infoGraphs = new DataStream(JSON.parse)
        infoGraphs.load("https://map-of-scince.firebaseio.com/infographs.json")
        infoGraphs.on(list => {
                stream(R.mapObjIndexed((i => new InfoGraph(i)), list))
            }
        )
        return stream
    },

    lastExt: (id: string) => {
        console.log("get ext :", id)
        const stream = A.start()
        let starCountRef = firebase.database().ref('ex/' + id).limitToLast(1);
        starCountRef.on('value', function (snapshot) {

            console.log("get ext numChildren :", snapshot.numChildren())
            if (snapshot.numChildren() == 1) {
                stream(R.values(snapshot.val())[0])
            }
        });
        return stream
    },
    lastcoords: (id: string) => {
        console.log("get coords: ", id)
        const stream = A.start()
        let starCountRef = firebase.database().ref('coords/' + id).limitToLast(1);
        starCountRef.on('value', function (snapshot) {
            if (snapshot.numChildren() == 1) {
                stream(R.values(snapshot.val())[0])
            }
        });
        return stream
    }
}
export default raw