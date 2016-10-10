
import BaseNode from "../classes/basenode.class";
import {BaseData} from "../classes/basedata.class";
import {BaseEdge} from "../classes/baseedge.class";


function init(rawData): BaseData {
    console.log("calc start")
    let nodes: BaseNode[] = rawData.graph.map(i => new BaseNode(i))
    console.log("calc next")

    // let ed = {}
    let mainEdges = []
    nodes.forEach(n => {
        n.nodes.forEach(i => {
            mainEdges.push(new BaseEdge({
                id: `${n.id}->${i}`,
                source: parseInt(n.id),
                target: parseInt(i)
            }))
            // ed[e.uid] = e
        })
    })

    let hidden = {}

    //R.mapObjIndexed((v, k) => {
    //         let hnode = new HiddenNode({
    //             id: k,
    //             name: v
    //         })
    //         let relevance = 0
    //         BaseNode.pool.forEach(n => {
    //             if (n.hiddenMap[k]) {
    //                 n.hiddenNodes.push(hnode)
    //                 relevance++
    //             }
    //         })
    //         hnode.relevance = relevance
    //         return hnode
    //     }, rawData.sub
    // )

    nodes.sort((n1, n2) => n1._size - n2._size)

    let defiedColors =chroma.scale(['#A4B5BD','#565F63']).colors(BaseNode.maxSize)
    console.log(defiedColors)

    for (let i = 0; i < nodes.length; i++) {
        nodes[i].init(i, defiedColors)
    }

    // let edge = R.values(ed)
    let edge = R.values(BaseEdge.unics)
    console.log("calc ok")

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