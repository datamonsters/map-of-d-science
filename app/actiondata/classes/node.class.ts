import {IndexOf, A} from "alak";
import state from "../state";
import {BaseEdge, getUID} from "./edge.class";
let nodesPool: BaseNode[] = []
let nodesMap: IndexOf<BaseNode> = {}


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
    // public label
    public name
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
        if (BaseEdge.exClear[uid]) return false
        return true
    }

    get title() {
        return this.name
    }

    get label() {
        return this.name
    }

    get description() {
        return `Related Topics: ${this.nodesInOut.length} `
    }

    init(p, colors) {
        // this.wikiID = this.label.replace(/\s/g, "_")
        if (this.nodes)
            this.nodes = this.nodes.map(n => BaseNode.map[n])
        this.size = this._size = p

        this._color = this.color = colors[p]
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


    _state

    redraw() {
        switch (this.state) {
            case "select":
                this.color = "#0058AD"
                this.size = this._size * 10
                setTimeout(() => this.edgesIoOut.forEach(e => e.showIn()), 1)
                this._state = this.state
                break
            case "selectInOut":
                this.color = "#005DB8"
                this.size = this._size * 10
                break
            case "selectIn":
                this.color = "#548ABF"
                this.size = this._size * 10
                break
            case "selectOut":
                this.color = "#ABCEF0"
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

        if (this._state != this.state) {
            this.edgesIoOut.forEach(e => e.hide())
        }
        this._state = this.state
    }
}
