import {IndexOf, A} from "alak";
import state from "../state";
import {BaseEdge, getUID} from "./edge.class";
import {BaseTag} from "./tags";
let nodesPool: BaseNode[] = []
let nodesMap: IndexOf<BaseNode> = {}
let nodesNamesMap: IndexOf<BaseNode> = {}


export default class BaseNode {

    static clear() {
        R.empty(nodesMap)
        R.empty(nodesPool)
        R.empty(nodesNamesMap)
    }

    static pool = nodesPool
    static map = nodesMap
    static names = nodesNamesMap
    static maxSize = 0

    tags: BaseTag[] = [];
    id: string = Math.random() + "x"
    nodes: any[] = []
    edgesInOut: BaseEdge[] = []
    edgesAll: BaseEdge[] = []
    edgesOut = {}
    edgesIn = {}
    nodesOut = {}
    nodesIn = {}
    nodesInOut = []
    name
    size
    _size
    linkCount = 0
    sizeK = 0
    color
    glyphs = []
    _color
    x = Math.random() * 1500
    y = Math.random() * 1500
    wikiID: string
    state = ""
    private _state

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
        nodesNamesMap[this.wikiID] = this
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


        state.selectedTag.on(tag => {
            let sn = state.selectedNode()
            if (sn) this.state = getState(sn.id)
            else  this.state = "clear"
            if (tag && tag.nodes[this.id] && this.state != "select") {
                this.state = "tag"
            }
            this.redraw()
        })
    }


    redraw() {

        switch (this.state) {
            case "select":
                this.color = "#AA0000"
                this.size = this._size * 10

                // setTimeout(() => this.edgesInOut.forEach(e => e.showIn()), 1)
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
            case "tag":
                this.color = "#ff861f"
                this.size = this._size * 20
                break
        }

        // if (this._state != this.state) {
        //     this.edgesInOut.forEach(e => e.hide())
        // }
        this._state = this.state
    }
}
