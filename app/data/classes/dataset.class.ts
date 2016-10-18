import {BaseGraph} from "./basegraph.class";
import {A} from "alak";
import {IAStream} from "alak";

export class DataSet {
    id: string
    name: string
    graph = A.start() as IAStream<BaseGraph>
    coords: any
    xedits: any

    constructor() {

    }

    setGraph(id: string) {
        BaseGraph.load(id, this.graph)
    }
}