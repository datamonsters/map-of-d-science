import BaseNode from "./basenode.class";

import DataStream from "../services/datastream";
import calc from "../graph.calc";

const rawGraph = new DataStream(JSON.parse)
const loadGrpah = (id) => {

}




export class BaseGraph {
    constructor(public nodes: BaseNode[],
                public edges: any) {
    }

    static load(id: string, done) {
        rawGraph.load("https://map-of-scince.firebaseio.com/graphs/"+id+".json")
        rawGraph.on(d=>{
            done(calc.init(d))
        })
    }
}