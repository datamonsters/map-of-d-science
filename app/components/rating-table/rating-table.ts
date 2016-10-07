import state from "../../data/state";
import BaseNode from "../../data/classes.data";
import {BaseEdge} from "../../data/classes.data";
import {HiddenNode} from "../../data/classes.data";

let arrows = {
    up: "arrow green up icon",
    no: "minus gray icon",
    down: "arrow red down icon"
}

let colorClass = ""

export default (opt, tag)=> {
    console.log("rating-table")
    // tag.rating = [1,2,3,4,5,7]

    tag.selectNode = (e)=> {
        // console.log(e)
        state.selectedNode(e.item)
    }
    tag.onOut = (e) =>{
    }

    tag.on('mount', ()=> {
        // console.log("$('ratingTable')",$('ratingTable').tablesort);
        $('.menu .item')
            .tab()
        ;
        state.selectedNode.on(n=>{
            tag.nodeSelected = true
            tag.update()
        })
        state.clearState.on(n=>{
            tag.nodeSelected = false
            tag.update()
        })
        $('.ui.dropdown')
            .dropdown({
                onChange: (value, text, $selectedItem)=> {

                    state.subSelect(HiddenNode.map[value])
                }
            })
        ;

        state.selectedNode.on(node=>{

            tag.titletext = node.label
            tag.hiddenNodes = node.hiddenNodes
            tag.nodesOut = R.values(node.edgesOut).map((e:BaseEdge)=>BaseNode.map[e.target])
            tag.edgesIn = R.values(node.edgesIn).map((e:BaseEdge)=>BaseNode.map[e.source])
            tag.update()

        })

    })


}