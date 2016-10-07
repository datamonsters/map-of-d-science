import {AO, A} from "alak";
import state from "./state";
const colors = {}
const gen = (id) => {
    let color = colors[id]
    if (!color) color = colors[id] = stringToColour(id)
    return color
}

let stringToColour = function (str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    let colour = '#';
    for (let i = 0; i < 3; i++) {
        let value = (hash >> (i * 8)) & 0xFF;
        colour += ('00' + value.toString(16)).substr(-2);
    }
    return colour;
}


let nodesPool: BaseNode[] = []
let nodesMap: AO<BaseNode> = {}
export default class BaseNode {
    static pool = nodesPool
    static map = nodesMap
    static colorSubSelected = "#43515D"
    static colorFade = "#D8D4CF"
    public id: string = Math.random() + "x"
    public nodesA: any[]
    public nodesB: any[]
    public hiddenMap: any
    public hiddenNodes: HiddenNode[] = []
    public edgesOut = {}
    public edgesIn = {}
    public nodesOut = {}
    public nodesIn = {}
    public label
    public size
    public _size
    public color
    public glyphs = []
    private _color
    public x = Math.random() * 1500
    public y = Math.random() * 1500

    private state = ""

    get title() {
        return this.label
    }

    get description() {
        return `Nodes - Out:${R.values(this.edgesOut).length}  In:${R.values(this.edgesIn).length}  Hidden:${this.hiddenNodes.length}`
    }

    constructor(o) {
        Object.assign(this, o)
        nodesMap[this.id] = this
        nodesPool.push(this)
        this.hiddenMap = R.indexBy(x => x, this.nodesB)
        this.size = this._size = this.nodesA.length + this.nodesB.length
        this.color = this._color = stringToColour(this.label)


        const getState = (nid) => {
            if (nid == this.id) return "select"
            let isIn = this.nodesIn[nid]
            let isOut = this.nodesOut[nid]
            if (isIn && isOut) return "selectInOut"
            else if (!isIn && isOut) return "selectOut"
            else if (isIn && !isOut) return "selectIn"
            else return "fade"
        }


        state.clearState.on(() => {
            this.state = "clear"
            this.redraw()
        })
        state.selectedNode.on(n => {
            this.state = getState(n.id)
            R.empty(this.glyphs)
            this.redraw()
        })

        state.subSelect.on(h => {
            while (this.glyphs.length) this.glyphs.shift()
            console.log(this.glyphs.length)
            if (this.hiddenMap[h.id]) {
                this.glyphs.push({
                    'position': 'top-left', // ['top-left', 'top-right', 'bottom-right', 'bottom-left']
                    fillColor: '#CC0DFF',
                    strokeColor: () => this.color,
                    strokeIfText: false,
                })
                if (this.state == "fade") {
                    this.size = this._size * 1000 + 200000
                }
            } else {
                this.redraw()
            }
        })
    }

    redraw() {
        switch (this.state) {
            case "select":
                this.color = "#FF0000"
                this.size = this._size * 1000 + 3300000
                break
            case "selectInOut":
                this.color = "#24F800"
                this.size = this._size * 1000 + 1000000
                break
            case "selectIn":
                this.color = "#FFD700"
                this.size = this._size * 1000 + 300000
                break
            case "selectOut":
                this.color = "#26BEFB"
                this.size = this._size * 1000 + 700000
                break
            case "clear":
                this.color = this._color
                this.size = this._size
                break
            case "fade":
                this.color = BaseNode.colorFade
                this.size = this._size
                break
            case "selectHidden":
                this.color = "#FF0DFF"
                this.size = this._size * 1000
                break
        }
    }
}


let hiddenPool = []
let hiddenMap = {}
export class HiddenNode {
    static map = hiddenMap
    public id
    public name
    public relevance

    constructor(o) {
        Object.assign(this, o)
        hiddenMap[this.id] = this
        hiddenPool.push(this)
        // this.size = this.nodesA.length + this.nodesB.length
        // this.color = this._color = stringToColour(this.label)
    }
}


let edgesMap = {}
let edgesPool: BaseEdge[] = []
let uncalMap = {}
export class BaseEdge {
    static pool: BaseEdge[] = edgesPool
    static map = edgesMap
    public id
    public source
    public target
    public hidden = true
    public color
    public size
    public uid

    constructor(o) {
        Object.assign(this, o)
        edgesMap[this.id] = this
        edgesPool.push(this)

        this.uid = this.source * 11 + this.target * 11

        BaseNode.map[this.source].edgesOut[this.id] = this
        BaseNode.map[this.source].nodesOut[this.target] = true
        BaseNode.map[this.target].edgesIn[this.id] = this
        // BaseNode.m
        // console.log(BaseNode.map[this.source].nodesOut[this.target])
    }

    showOut() {
        this.hidden = false
        this.size = .0001
        this.color = "#70879C"
    }

    showIn() {
        this.hidden = false
        this.size = .0001
        this.color = BaseNode.colorFade
    }

    hide() {
        this.hidden = true
        this.size = .0001
    }

}


export class BaseData {
    constructor(public nodes: BaseNode[],
                public edges: any,
                public sub: any) {
    }
}