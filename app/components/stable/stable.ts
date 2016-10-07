import linechart from "./d3.linechart";
import state from "../../data/state";
export default (opt, tag)=> {
    tag.on('mount', ()=> {
        linechart.init()
        state.data.on(linechart.draw)
        state.selected.on(id=>{
            console.log("idid",id);
            let line = $('.line')
            line.removeClass("selected-line")
            if (id!="out"){
                line.addClass("hide-line")
                $('#'+id).addClass("selected-line")
            } else  {
                console.log("!!!!!");
                line.removeClass("hide-line")
            }
        })
    })
}