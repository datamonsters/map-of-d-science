import BaseNode from "./classes/basenode.class";
import {BaseGraph} from "./classes/basegraph.class";
import {BaseEdge} from "./classes/baseedge.class";


function init(rawData): BaseGraph {
    console.log("calc start")
    let nodes: BaseNode[] = rawData.graph.map(i => new BaseNode(i))

    let mainEdges = []
    nodes.forEach(n => {
        n.nodes.forEach(i => {
            mainEdges.push(new BaseEdge({
                id: `${n.id}->${i}`,
                source: parseInt(n.id),
                target: parseInt(i)
            }))
        })
    })


    nodes.sort((n1, n2) => n1._size - n2._size)

    let defiedColors = chroma.scale(['#A4B5BD', '#565F63']).colors(BaseNode.maxSize)

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].init(i, defiedColors)
    }

    // let edge = R.values(ed)
    let edge = R.values(BaseEdge.unics)

    return new BaseGraph(
        nodes,
        edge
    )
}
const calc = {
    init: init
}

export default calc