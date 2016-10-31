import {AController, Tag} from "arts";
import state from "../../../actiondata/state";
import {GraphCommand} from "../../graph-sigma/graph.command";

export default class ZoomController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
        tag.zoomIn = ()=> state.graphCommand(GraphCommand.ZoomIn)
        tag.reset = ()=> state.graphCommand(GraphCommand.Reset)
        tag.zoomOut = ()=> state.graphCommand(GraphCommand.ZoomOut)
    }
    //
    // onmount() {
    //     console.log(component mount: "zoom ")
    // }

}