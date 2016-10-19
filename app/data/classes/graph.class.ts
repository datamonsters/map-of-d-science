import BaseNode from "./node.class";

import DataStream from "../services/datastream";
import calc from "./graph.calc";
import {InfoGraph} from "./infograph.class";

const rawGraph = new DataStream(JSON.parse)



export class BaseGraph {
    info:InfoGraph
    constructor(public nodes: BaseNode[],
                public edges: any) {
    }

    static load(info: InfoGraph, done) {
        rawGraph.load("https://map-of-scince.firebaseio.com/graphs/"+info.id+".json")
        rawGraph.on(d=>{
            let g = calc.init(d)
            g.info = info
            done(g)
        })
    }
}