import BaseNode from "./classes.data"
import {BaseEdge} from "./classes.data";
import {BaseData} from "./classes.data";
import {HiddenNode} from "./classes.data";


function init(rawData): BaseData {
    let nodes: BaseNode[] = rawData.graph.map(i => new BaseNode(i))

    let ed = {}
    nodes.forEach(n => {
        n.nodesA.forEach(i => {
            let e = new BaseEdge({
                id: `${n.id}->${i}`,
                source: parseInt(n.id),
                target: parseInt(i)
            })
            ed[e.uid] = e
        })
    })


    let hidden = R.mapObjIndexed((v, k) => {
            let hnode = new HiddenNode({
                id: k,
                name: v
            })
            let relevance = 0
            BaseNode.pool.forEach(n => {
                if (n.hiddenMap[k]) {
                    n.hiddenNodes.push(hnode)
                    relevance++
                }
            })
            hnode.relevance = relevance
            return hnode
        }, rawData.sub
    )


    let edge = R.values(ed)
    return new BaseData(
        nodes,
        edge,
        hidden
    )
}
const calc = {
    init: init
}

export default calc