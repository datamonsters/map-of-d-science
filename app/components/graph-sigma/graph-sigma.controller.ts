import {AController, Tag} from "arts";
import graphSigma from "./graph-container.sigma";
import state from "../../actiondata/state";
import {GraphCommand} from "./graph.command";

export default class GraphSigmaController implements AController {
    opt: any
    tag: Tag

    // oncreate(opt: any, tag: any) {
    //     console.log("graph-sigma component mount")
    // }
    //
    onmount() {
        console.log("component mount: graph-sigma")
        graphSigma.init()

        let overlay = $('#imageoverlay')


        let resize = () => {
            let centrX = window.innerWidth / 2
            let centrY = window.innerHeight / 2
            let min = Math.min(centrX, centrY)
            let size = Math.min(window.innerHeight, window.innerWidth)
            overlay.css("left", centrX - min + "px")
            overlay.css("top", centrY - min + "px")
            overlay.css("width", size + "px")
            overlay.css("height", size + "px")
            overlay.show()
            overlay.removeClass("fade-out")
            overlay.addClass("fade-in")
            state.selectedNode(false)
        }

        state.graphCommand.on(c => {
            if (c == GraphCommand.Reset) {
                resize()
            } else {
                // overlay.hide()
                overlay.removeClass("fade-in")
                overlay.addClass("fade-out")
            }
        })
        window.addEventListener('resize', resize, true)
        resize()
        overlay.hide()
        let last
        state.dataSet.data.on(x => {
            if (last) clearTimeout(last)
            last = setTimeout(() => state.graphCommand(GraphCommand.Reset), 500)
        })
    }

}