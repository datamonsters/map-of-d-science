import {AController, Tag} from "arts";
import state from "../../../actiondata/state";
import {BaseEdge} from "../../../actiondata/classes/edge.class";
import writer from "../../../actiondata/services/data.writer";

export default class EditMenuController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
        tag.configure = () => {
            $('.ui.modal')
                .modal('show')
        }
        tag.savePosition = writer.writeCoords
        tag.saveEx = () => {
            if (BaseEdge.timeout) {
                setTimeout(() => writer.writeEx(BaseEdge.exClear), 2000)
            } else {
                writer.writeEx(BaseEdge.exClear)
            }
        }

        tag.force = "play"
        tag.forcechange = () => {
            let nv = state.force()
            state.force(!nv)
            tag.update({
                force: !nv ? "stop" : "play"
            })
        }
        state.dataSet.graph.on(g => tag.update({
            title: g.info.name + " n:" + g.info.nodesCount + " e:" + g.info.edgesCount + "/" + BaseEdge.upool.length
        }))
    }

    //
    // onmount() {
    //     console.log("edit-menu component mount")
    // }

}