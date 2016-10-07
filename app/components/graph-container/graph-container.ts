import state from "../../data/state";
import graphSigma from "./graph-container.sigma";
export default (opt, tag)=> {

    tag.on('mount', ()=> {
        graphSigma.init()
        state.data.on(graphSigma.draw)
    })


}