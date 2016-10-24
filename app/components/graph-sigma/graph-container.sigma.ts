import state from "../../actiondata/state";
import RendererConfigs = SigmaJs.RendererConfigs;
import {BaseGraph} from "../../actiondata/classes/graph.class";
import BaseNode from "../../actiondata/classes/node.class";

let s

function init() {
    state.actionClear.on(() => setTimeout(()=>s.refresh(), 100))
    state.selectedNode.on(() => {
        setTimeout(()=>s.refresh(), 100)
    })
    state.force.on(v => {
        if (v) sigma.layouts.startForceLink()
        else sigma.layouts.stopForceLink()
    })
    s = new sigma({
        settings: { //    https://github.com/Linkurious/linkurious.js/wiki/Settings
            zoomMin: 0.0002,
            dragNodeStickiness: 0.01,
            nodeBorderSize: 0,
            // labelSizeRatio: 0.0003,
            // labelThreshold: 14,
            defaultNodeBorderColor: '#000',
            enableEdgeHovering: false,
            drawEdges: true,
            // edgeHoverHighlightNodes: 'circle',

            minNodeSize: 3,
            // maxNodeSize: 10
        }
    })


    s.addRenderer({
        container: 'graph-container',
        type: "canvas"
    })


    let fa = sigma.layouts.configForceLink(s, {
        worker: true,
        autoStop: true,
        background: false,
        easing: 'cubicInOut',
        scaleRatio: 3,
        gravity: 30
    });

    sigma.renderers.def = sigma.renderers.canvas;
    let activeState = sigma.plugins.activeState(s)
    let dragListener = sigma.plugins.dragNodes(s, s.renderers[0], activeState)
    dragListener.bind('startdrag', function (event) {
        state.selectedNode(event.data.node as BaseNode)
    })

    state.dataSet.data.on((data: BaseGraph)=>{
        console.log("sigma redraw graph:", data.nodes.length, data.edges.length)
        s.graph.clear()
        s.graph.read(data)
        s.refresh()
    })

}
const graphSigma = {
    init: init
}

export default graphSigma