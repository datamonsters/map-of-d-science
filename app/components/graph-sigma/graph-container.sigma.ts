import state from "../../actiondata/state";
import RendererConfigs = SigmaJs.RendererConfigs;
import {BaseGraph} from "../../actiondata/classes/graph.class";
import BaseNode from "../../actiondata/classes/node.class";
import A from 'alak'
import {GraphCommand} from "./graph.command";

let s

function init() {
    const delayedRefresh = ()=> setTimeout(() => s.refresh(), 100)
    state.actionClear.on(delayedRefresh)
    state.selectedNode.on(delayedRefresh)
    state.selectedTag.on(delayedRefresh)



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
        if (event.data.node == state.selectedNode())
            { //noinspection TypeScriptValidateTypes
                state.selectedNode(false)
            }
        else
        state.selectedNode(event.data.node as BaseNode)
    })

    state.dataSet.data.on((data: BaseGraph) => {
        console.log("sigma redraw graph: ", data.nodes.length, data.edges.length)
        s.graph.clear()
        s.graph.read(data)
        s.refresh()
    })

    let cam = s.camera
    let p = {}
    let isreset = -1
    let doreset = () => {
        isreset = -1
        console.log("doreset")
        state.graphCommand(GraphCommand.Dragg)
    }
    cam.bind('coordinatesUpdated', () => {
        if (isreset > 0) {

            if (s.camera.x != 0 || s.camera.y != 0 && s.camera.ratio != 1) {
                clearTimeout(isreset)
                console.log("coordinatesUpdated")
                isreset = setTimeout(doreset, 1)

            }
        }
    })

    p[GraphCommand.ZoomIn] = () => {
        sigma.misc.animation.camera(cam, {
            ratio: cam.ratio / cam.settings('zoomingRatio')
        }, {
            duration: 333
        })
    }
    p[GraphCommand.ZoomOut] = () => {
        sigma.misc.animation.camera(cam, {
            ratio: cam.ratio * cam.settings('zoomingRatio')
        }, {
            duration: 333
        })
    }
    p[GraphCommand.Reset] = () => {
        sigma.misc.animation.camera(
            s.camera, {
                x: 0,
                y: 0,
                ratio: 1
            },
            {duration: 300}
        )
        setTimeout(() => {
            isreset = 1
        }, 1020)
    }
    state.graphCommand.on(command => A.match(command, p))
}
const graphSigma = {
    init: init
}
export default graphSigma