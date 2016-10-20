import {AController, Tag} from "arts";
import graphSigma from "./graph-container.sigma";
import state from "../../actiondata/state";

export default class GraphSigmaController implements AController {
    opt: any
    tag: Tag

    // oncreate(opt: any, tag: any) {
    //     console.log("graph-sigma component mount")
    // }
    //
    onmount() {
        console.log("component mount: graph-sigma")
        graphSigma.init()

    }

}