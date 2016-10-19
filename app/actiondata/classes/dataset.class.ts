import {BaseGraph} from "./graph.class";
import {A} from "alak";
import {IAStream} from "alak";
import state from "../state";
import {InfoGraph} from "./infograph.class";

export class DataSet {
    id: string
    name: string
    graph = A.start() as IAStream<BaseGraph>
    coords: any
    xedits: any

    data = A.start() as IAStream<BaseGraph>

    constructor() {
        this.graph.on(g => {
            this.data(g)
        })

    }

    loadGraphByInfo(id) {
        BaseGraph.load(id, this.graph)
    }

    restore() {
        let startGrpah = Cookies.get('startGrpah')
        if (!startGrpah) {
            state.infoGraphs.on(i => {
                this.loadGraphByInfo(
                    R.values<InfoGraph>(i)
                        .sort((a, b) => b.time - a.time)
                        [0]
                )
            })
        }
    }
}