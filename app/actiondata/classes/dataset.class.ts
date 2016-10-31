import {BaseGraph} from "./graph.class";
import {A} from "alak";
import {AStream} from "alak";
import state from "../state";
import {InfoGraph} from "./infograph.class";
import writer from "../services/data.writer";
import raw from "../services/initdata.loader";
import {BaseEdge} from "./edge.class";



export class DataSet {
    id: string
    name: string
    graph = A.start<BaseGraph>()
    coords = A.start()
    ext = A.start()

    data = A.start<BaseGraph>()

    constructor() {
        this.graph.on(g => {
            this.data(g)
        })


        A.mix(this.graph, this.coords, this.ext).on(() => {
            let g = this.graph()
            let c: any = this.coords()
            if (c) {
                g.nodes.forEach(n => {
                    let nc = c.coords[n.id]
                    if (!nc) {
                        console.info("::: mssing node ID", n.id)
                    } else {
                        n.x = nc.x
                        n.y = nc.y
                    }
                })
            }


            let ex = (this.ext() as any).ex
            if (ex) {
                console.log("ex:", ex)
                BaseEdge.init(ex)
                g.edges = BaseEdge.upool
            }
            this.data(g)
        })
    }


    loadGraphByInfo(info: InfoGraph) {
        this.coords(false)
        this.ext(false)
        BaseGraph.load(info.id, g => {
            g.info = info
            Cookies.set('startGrpah', info.id)
            this.graph(g)
        })
        raw.lastcoords(info.id).on(this.coords)
        raw.lastExt(info.id).on(this.ext)

    }

    restore() {
        let startGrpah = Cookies.get('startGrpah')
        console.log("startGrpah", startGrpah)

        state.infoGraphs.on(i => {
            if (!startGrpah) {
                this.loadGraphByInfo(
                    R.values<InfoGraph>(i)
                        .sort((a, b) => b.time - a.time)
                        [0]
                )
            } else {
                this.loadGraphByInfo(i[startGrpah])
            }
        })

    }
}