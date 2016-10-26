import BaseNode from "./node.class";
import A from "alak";
import state from "../state";
let edgesMap = {}
let edgesPool: BaseEdge[] = []
let alluncalMap = {}
let exMap = {}
let exClearMap = {}
let uncalMap = {}
let uncalPool: BaseEdge[] = []


let a
export const getUID = (...n) => {
    a = n.map(x=>{
        return x.slice(1)
    })
    a.sort((a, b) => b - a)
    return a.join("-")
}
let timeout
export class BaseEdge {
    static get timeout(){return timeout}
    static setEx(id: string, id2:string, checked: boolean) {
        let uid = getUID(id, id2)
        exMap[uid] = !checked

        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(()=>{
            BaseEdge.init()
            let d = state.dataSet.data()
            d.edges = BaseEdge.upool
            state.dataSet.data(d)
            timeout = null
        }, 1900)
    }
    // static pool: BaseEdge[] = edgesPool
    // static map = edgesMap
    // static umap: BaseEdge[]
    static get upool() {
        return uncalPool
    }
    static get exClear() {
        return exClearMap
    }

    static clear() {
        exMap = {}
        edgesMap = {}
        edgesPool = []
        alluncalMap = {}
        uncalMap = {}
        uncalPool = []
        exClearMap = {}
    }




    static init(ext?) {
        uncalPool = []
        if (ext) exMap = ext
        exClearMap = {}

        R.mapObjIndexed((v, k) => {
            if (v) exClearMap[k] = true
        }, exMap)
        R.values<BaseEdge>(uncalMap).forEach(e => {
            if (!exMap[e.uid]) uncalPool.push(e)
        })

        BaseNode.pool.forEach(n => {
            n.edgesIoOut = []
            n.nodesInOut = []
        })
        console.log("init edges")

        R.values<BaseEdge>(uncalMap).forEach(e => {
            BaseNode.map[e.source].edgesIoOut.push(e)
            BaseNode.map[e.target].edgesIoOut.push(e)
            BaseNode.map[e.target].nodesInOut.push(BaseNode.map[e.source])
            BaseNode.map[e.source].nodesInOut.push(BaseNode.map[e.target])
        })
    }

    public id
    public source:string
    public target:string
    public hidden = true
    public color
    public size = 0.0001
    public uid

    constructor(o) {
        A.assign(this, o)
        edgesMap[this.id] = this
        edgesPool.push(this)

        this.uid = getUID(this.target, this.source)
        if (alluncalMap[this.uid]) {
            uncalMap[this.uid] = this
        } else {
            alluncalMap[this.uid] = this
        }


        let source = BaseNode.map[this.source]
        let target = BaseNode.map[this.target]
        source.edgesOut[this.id] = this
        if (!target) {
            console.log(BaseNode.map)
        }
        target.edgesIn[this.id] = this

        source.nodesOut[this.target] = true
        target.nodesIn[this.source] = true

        target.linkCount++
        source.linkCount++

    }

    showOut() {
        this.hidden = false
        this.size = .0001
        this.color = "#eee"
        this.size = .5
        // this.color = "#baffff"
    }

    showIn() {
        this.hidden = false
        this.size = .5
        this.color = "#eee"
        // this.color = "#ffdaff"
        //BaseNode.colorFade
    }

    hide() {
        this.hidden = true
        this.size = .5
    }
}
