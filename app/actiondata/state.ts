import loader from "./services/initdata.loader";
import {A} from "alak";

import BaseNode from "./classes/node.class";
import {BaseGraph} from "./classes/graph.class";
import {DataSet} from "./classes/dataset.class";
import {GraphCommand} from "../components/graph-sigma/graph.command";




// loader.jsonRaw.on(rawData => {
//     data(calc.init(rawData))
// })


class State {
    infoGraphs = loader.infoGraphsStream()
    infoWiki = loader.infoWikiStream()
    tags = loader.tagsStream()
    data = A.start<BaseNode>()
    selectedNode = A.start<BaseNode>()

    editMode = A.start()

    dataType = A.start()
    searchMode = A.start("select")
    actionClear = A.start()

    dataSet:DataSet = new DataSet()
    force = A.start(false)
    graphCommand = A.start<GraphCommand>()
}

const state = new State()
export default state

state.dataSet.restore()
