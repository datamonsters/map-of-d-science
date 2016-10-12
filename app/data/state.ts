import raw from "./services/rawloader";
import {A} from "alak";
import calc from "./data.calc";
import {IAStream} from "alak";
import BaseNode from "../classes/basenode.class";
import {BaseData} from "../classes/basedata.class";

const data = A.start() as IAStream<BaseData>
const selectedNode = A.start()  as IAStream<BaseNode>
const dataType = A.start()
const searchMode = A.start("select")
const clearState = A.start()



raw.jsonRaw.on(rawData => {
    data(calc.init(rawData))
})


const mapTypes = {
    json: () => {
        raw.jsonRaw.load("./assets/sgraph.json")
    }
}

dataType.on(type => A.match(type, mapTypes))


const state = {
    selectedNode: selectedNode,
    clearState: clearState,
    data: data,
    dataType: dataType,
    searchMode: searchMode,
    restore: () => {
        dataType("json")
    },
}

export default state