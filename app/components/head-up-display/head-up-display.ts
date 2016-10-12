import state from "../../data/state";
import BaseNode from "../../classes/basenode.class";

let arrows = {
    up: "arrow green up icon",
    no: "minus gray icon",
    down: "arrow red down icon"
}

let colorClass = ""

export default (opt, tag) => {

    tag.searchSelectMode = (e)=>{
        state.searchMode(e.target.dataset.text)
    }
    tag.resetState = ()=>{

        $("#node-search").val("")
        state.clearState(Math.random())
        tag.nodeName = ""
        tag.nodeSelected = false
        tag.update()
    }

    tag.on('mount', () => {
        state.selectedNode.on(n=>{
            tag.nodeName = n.label
            tag.nodeSelected = true
            tag.update()
            $("#node-search").val(n.label)

        })
        state.searchMode.on(mode=>{
            $(".search-mode").removeClass('active')
            $(".search-mode."+mode).addClass('active')
        })
        state.data.on(data => {
            $('.ui.search')
                .search({
                    searchFullText: false,
                    source: data.nodes.map(x=>{
                        return {
                            id:x.id,
                            description:x.description,
                            title:x.label
                        }
                    }),
                    onSelect: (result, response) => {
                        console.log("result", result)
                        state.selectedNode(BaseNode.map[result.id])
                    }
                })


        })
    })



}