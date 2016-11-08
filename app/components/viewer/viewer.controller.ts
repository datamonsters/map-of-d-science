import {AController, Tag} from "arts";
import BaseNode from "../../actiondata/classes/node.class";
import state from "../../actiondata/state";
import {BaseEdge} from "../../actiondata/classes/edge.class";


export default class ViewerController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
        let current: BaseNode
        state.selectedNode.on(node => {
            current = node
            tag.update({
                node: node
            })
            // state.tags.once(alltags => {
            //
            // })
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
        tag.selectTag = (i) =>{
            state.selectedTag(i.item.basetag)
        }
    }

    //
    onmount() {
        state.dataSet.data.on(g => {
            let component = $('#searchnode')
            component
                .search({
                    source: g.nodes,
                    onSelect: state.selectedNode,
                    searchFields: [
                        'name'
                    ],
                    onResultsClose: () => {
                        setTimeout(() => component.search("set value", ""), 333)
                    },
                    onResultsOpen: () => {
                        state.selectedNode(false)
                    }
                })
            ;
        })
    }

}