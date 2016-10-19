import {AController, Tag} from "arts";
import state from "../../../data/state";

export default class EditMenuController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
        tag.configure = () => {
                $('.ui.modal')
                    .modal('show')
        }
        tag.save = () => {
            console.log("save")
        }
        state.dataSet.graph.on(g=>tag.update({
            title:g.info.name + " n:"+ g.info.nodesCount+ " e:" +g.info.edgesCount
        }))
    }

    //
    // onmount() {
    //     console.log("edit-menu component mount")
    // }

}