import {AController, Tag} from "arts";
import state from "../../../actiondata/state";
import BaseNode from "../../../actiondata/classes/node.class";
import {BaseEdge} from "../../../actiondata/classes/edge.class";
import raw from "../../../actiondata/services/initdata.loader";
import writer from "../../../actiondata/services/data.writer";

export default class InfoPaneController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
        // state.editMode.on(v => tag.update({editmode: v}))

        // console.log("opt:", opt)
        let current: BaseNode
        state.selectedNode.on(node => {
            current = node
            console.log("node", node)

            tag.update({
                node: node
            })
        })
        tag.nodeSelect = (i) => {
            state.selectedNode(i.item)
        }
        tag.close = () => {
            // state.selectedNode(false as BaseNode)
        }
        tag.changeEx = (i) => {
            BaseEdge.setEx(current.id, i.item.id, i.target.checked)
        }
    }

    //
    onmount() {
        state.dataSet.data.on(g => {
            $('#searchnode')
                .search({
                    source: g.nodes,
                    onSelect: state.selectedNode

                })

            ;
        })
    }

}