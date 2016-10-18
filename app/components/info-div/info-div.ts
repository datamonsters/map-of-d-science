import state from "../../data/state";
import BaseNode from "../../data/classes/basenode.class";

let arrows = {
    up: "arrow green up icon",
    no: "minus gray icon",
    down: "arrow red down icon"
}

let colorClass = ""

export default (opt, tag)=> {
    // tag.rating = [1,2,3,4,5,7]

    tag.selectNode = (e)=> {
        state.selectedNode(e.item)
        // $.ajax({
        //     type: "GET",
        //     url: "https://en.wikipedia.org/w/api.php?format=xml&action=query&prop=extracts&titles="+e.item.wikiID+"&redirects=true",
        //     success: (x)=>{
        //         console.log(x)
        //
        //     },
        //     dataType: "xml"
        // });
    }
    tag.onOut = (e) =>{
    }

    tag.openNode =(e)=> {
        window.open("http://en.wikipedia.org/wiki/"+e.item.wikiID,'_blank')
    }

    tag.on('mount', ()=> {
        // console.log("$('ratingTable')",$('ratingTable').tablesort);
        // $('.menu .item')
        //     .tab()
        // ;
        state.selectedNode.on(n=>{
            tag.nodeSelected = true
            tag.update()
        })
        state.actionClear.on(n=>{
            tag.nodeSelected = false
            tag.update()
        })
        // $('.ui.dropdown')
        //     .dropdown({
        //         onChange: (value, text, $selectedItem)=> {
        //
        //             state.subSelect(HiddenNode.map[value])
        //         }
        //     })
        // ;
        //
        state.selectedNode.on(node=>{
            console.log(node)

            tag.titletext = node.label
            tag.nodes = node.nodes //R.values(node.nodes).map((n:BaseNode)=>BaseNode.map[e.target])
            // tag.edgesIn = R.values(node.edgesIn).map((e:BaseEdge)=>BaseNode.map[e.source])
            tag.update()

        })

    })


}