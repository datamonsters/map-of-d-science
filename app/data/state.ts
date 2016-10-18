import raw from "./services/rawloader";
import {A} from "alak";

import {IAStream} from "alak";
import BaseNode from "./classes/basenode.class";
import {BaseGraph} from "./classes/basegraph.class";
import {DataSet} from "./classes/dataset.class";

const data = A.start() as IAStream<BaseGraph>
const selectedNode = A.start()  as IAStream<BaseNode>
const selectedDataSet = A.start()  as IAStream<DataSet>
const dataType = A.start()
const searchMode = A.start("select")
const clearState = A.start()
const graphList = A.start()


// raw.jsonRaw.on(rawData => {
//     data(calc.init(rawData))
// })

raw.infoGraphs.on(info => {
    graphList(info)
})

const state = {
    dataSet:DataSet,
    graphList: graphList,

    selectedNode: selectedNode,
    // selectedDataSetda: selectedDataSet,

    actionClear: clearState,
    data: data,
    dataType: dataType,
    searchMode: searchMode,
    restore: () => {
        // dataType("json")
    },
}

export default state