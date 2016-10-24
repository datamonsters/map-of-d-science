import loader from "./services/initdata.loader";
import {A} from "alak";

import {IAStream} from "alak";
import BaseNode from "./classes/node.class";
import {BaseGraph} from "./classes/graph.class";
import {DataSet} from "./classes/dataset.class";




// loader.jsonRaw.on(rawData => {
//     data(calc.init(rawData))
// })


class State {
    infoGraphs = loader.infoGraphsStream()
    infoWiki = loader.infoWikiStream()
    data = A.start() as IAStream<BaseGraph>
    selectedNode = A.start()  as IAStream<BaseNode>

    editMode = A.start()

    dataType = A.start()
    searchMode = A.start("select")
    actionClear = A.start()

    dataSet:DataSet = new DataSet()
    force = A.start(false)
}
const state = new State()
export default state

state.dataSet.restore()
