import {AO, A} from "alak";
import state from "../state";
import {BaseEdge} from "./edge.class";
let nodesPool: BaseNode[] = []
let nodesMap: AO<BaseNode> = {}

let getUID = (...n) => {
    n.sort((a, b) => b - a)
    return n.join("-")
}

export default class BaseNode {
    static clear() {
        R.empty(nodesMap)
        R.empty(nodesPool)
    }

    static pool = nodesPool
    static map = nodesMap
    static maxSize = 0
    public id: string = Math.random() + "x"
    public nodes: any[] = []
    public edgesIoOut: BaseEdge[] = []
    public edgesOut = {}
    public edgesIn = {}
    public nodesOut = {}
    public nodesIn = {}
    public nodesInOut = []
    public label
    public size
    public _size
    public linkCount = 0
    public sizeK = 0
    public color
    public glyphs = []
    public _color
    public x = Math.random() * 1500
    public y = Math.random() * 1500
    public wikiID: string
    private state = ""

    // public title:string
    // public description:string

    isEx(id) {
        let uid = getUID(this.id, id)
        // console.log(uid, BaseEdge.exClear, BaseEdge.exClear[uid])
        if (BaseEdge.exClear[uid]) return false
        return true
    }
    get title() {
        return this.label
    }

    get description() {
        return `Two ways:${this.nodes.length} - Out:${R.values(this.edgesOut).length}  In:${R.values(this.edgesIn).length}`
    }

    init(p, colors) {
        this.wikiID = this.label.replace(/\s/g, "_")
        if (this.nodes)
            this.nodes = this.nodes.map(n => BaseNode.map[n])
        this.size = this._size = p
        this._color = this.color = colors[BaseNode.maxSize - p]
    }


    constructor(o) {
        A.assign(this, o)
        nodesMap[this.id] = this
        nodesPool.push(this)

        BaseNode.maxSize = Math.max(BaseNode.maxSize, this.nodes ? this.nodes.length : 0)

        const getState = (nid) => {
            if (nid == this.id) return "select"
            let isIn = this.nodesIn[nid]
            let isOut = this.nodesOut[nid]
            if (isIn && isOut) return "selectInOut"
            else if (!isIn && isOut) return "selectOut"
            else if (isIn && !isOut) return "selectIn"
            else return "fade"
        }

        state.selectedNode.on(n => {
            if (n) {
                this.state = getState(n.id)
            } else {
                this.state = "clear"
            }
            this.redraw()
        })
    }


    redraw() {
        switch (this.state) {
            case "select":
                this.color = "#909090"
                this.size = this._size * 10
                R.mapObjIndexed((o: any) => o.showIn(), this.edgesIn)
                R.mapObjIndexed((o: any) => o.showOut(), this.edgesOut)
                break
            case "selectInOut":
                this.color = "#61b0ff"
                this.size = this._size * 10
                break
            case "selectIn":
                this.color = "#2bf0f0"
                this.size = this._size * 10
                break
            case "selectOut":
                this.color = "#f285f2"
                this.size = this._size * 10
                break
            case "clear":
                this.color = this._color
                this.size = this._size
                break
            case "fade":
                this.color = "#D8D4CF"
                this.size = this._size
                break
            case "selectHidden":
                this.color = "#FF0DFF"
                this.size = this._size + 1000
                break
        }
    }
}
