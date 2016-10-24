import BaseNode from "./node.class";

import DataStream from "../services/datastream";
import calc from "./graph.calc";
import {InfoGraph} from "./infograph.class";
import state from "../state";

const rawGraph = new DataStream(JSON.parse)


export class BaseGraph {

    info: InfoGraph

    constructor(public nodes: BaseNode[],
                public edges: any,
                public om?: any) {
    }

    static load(id: string, done) {
        state.infoWiki.once(info => {
            rawGraph.load("https://map-of-scince.firebaseio.com/graphList/" + id + ".json")

            rawGraph.on(d => {
                let rawGraph = R.values<any>(d).map(n => {
                    // console.log("n")
                    // console.log(n.uid)

                    return {
                        id: n.uid,
                        nodes: n.nodes,
                        name: info[n.uid].name,
                        info: info[n.uid].info,
                        wikiID: info[n.uid].id
                    }
                })
                done(calc.init(rawGraph))
            })
        })
    }
}