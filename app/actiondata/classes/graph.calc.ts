import BaseNode from "./node.class";
import {BaseGraph} from "./graph.class";
import {BaseEdge} from "./edge.class";

function init(rawData): BaseGraph {
    BaseEdge.clear()
    BaseNode.clear()
    // console.log("baseGraph init:", rawData)
    let nodes: BaseNode[] = rawData.map(i => new BaseNode(i))
    let mainEdges = []
    nodes.forEach(n => {
        if (n.nodes)
        n.nodes.forEach(i => {
            mainEdges.push(new BaseEdge({
                id: `${n.id}->${i}`,
                source: n.id,
                target: i
            }))
        })
    })


    nodes.sort((n1, n2) => n1._size - n2._size)
    let defiedColors = chroma.scale([ '#525a5e', '#839097']).colors(BaseNode.pool.length+1)
    for (let i = 0; i < nodes.length; i++) {
        nodes[i].init(i, defiedColors)
    }


    BaseEdge.init()

    return new BaseGraph(
        nodes,
        BaseEdge.upool
    )
}
const calc = {
    init: init
}
export default calc