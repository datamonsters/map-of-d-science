import {AController, Tag} from "arts";
import state from "../../../actiondata/state";
console.log(state)

export default class InfoPaneController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
        state.editMode.on(v => tag.update({editmode: v}))

        state.selectedNode.on(node => {
            console.log(node)
            tag.update({
                node: node
            })
        })
        tag.nodeSelect = (i) => {
            state.selectedNode(i.item)
        }
    }

    //
    // onmount() {
    //     console.log("info-pane component mount")
    // }

}