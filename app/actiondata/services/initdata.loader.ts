import A from "alak";
import firebase from "firebase";


import DataStream from "./datastream";
import state from "../state";
import {InfoGraph} from "../classes/infograph.class";
import {tagRawParser, BaseTag} from "../classes/tags";
import {IndexOf} from "alak";

const raw = {
    tagsStream: () => {
        const stream = A.start<IndexOf<BaseTag>>()
        let rawDataStream = new DataStream()
        rawDataStream.on(raw => {
            console.log("tags loaded")
            state.dataSet.graph.on(graph => {
                stream(tagRawParser(raw))
                console.log("tags initialized complete")
            })
        })
        rawDataStream.load("./assets/tags.txt")
        return stream
    },
    infoWikiStream: () => {
        const stream = A.start()
        let infoStream = new DataStream(JSON.parse)
        infoStream.load("https://map-of-scince.firebaseio.com/infoWiki.json")
        infoStream.on(stream)
        return stream
    },
    infoGraphsStream: () => {
        const stream = A.start()
        let infoGraphs = new DataStream(JSON.parse)
        infoGraphs.load("https://map-of-scince.firebaseio.com/infoGraphs.json")
        infoGraphs.on(list => {
                stream(R.mapObjIndexed((i => new InfoGraph(i)), list))
            }
        )
        return stream
    },

    lastExt: (id: string) => {
        console.log("load exceptions:", id)
        const stream = A.start()
        let starCountRef = firebase.database().ref('exception').limitToLast(1);
        starCountRef.on('value', function (snapshot) {
            if (snapshot.numChildren() == 1) {
                stream(R.values(snapshot.val())[0])
            }
        });
        return stream
    },
    lastcoords: (id: string) => {
        console.log("load coordinates: ", id)
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