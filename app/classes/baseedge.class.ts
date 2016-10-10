
import BaseNode from "./basenode.class";
let edgesMap = {}
let edgesPool: BaseEdge[] = []
let uncalMap = {}
export class BaseEdge {
    static pool: BaseEdge[] = edgesPool
    static map = edgesMap
    static unics = uncalMap
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

        this.uid = (this.source + 1111) * (this.target + 1111)
        uncalMap[this.uid] = this

        let source = BaseNode.map[this.source]
        let target = BaseNode.map[this.target]
        source.edgesOut[this.id] = this
        target.edgesIn[this.id] = this

        source.nodesOut[this.target] = true
        target.nodesIn[this.source] = true

        target.linkCount++
        source.linkCount++

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
