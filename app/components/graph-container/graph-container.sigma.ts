
import state from "../../data/state";
import RendererConfigs = SigmaJs.RendererConfigs;
import {BaseData} from "../../classes/basedata.class";

let s

function init() {
    state.clearState.on(()=>s.refresh())
    state.selectedNode.on(()=>s.refresh())
}
const graphSigma = {
    init: init,
    draw(data: BaseData) {
        s = new sigma({
            graph: {
                nodes: data.nodes,
                edges: data.edges
            },
            settings: {
                zoomMin: 0.0002,
                dragNodeStickiness: 0.01,
                nodeBorderSize: 0,
                // labelSizeRatio: 1.3,
                // labelThreshold: 3.3,
                defaultNodeBorderColor: '#000',
                enableEdgeHovering: false,
                // drawEdges: true,
                // edgeHoverHighlightNodes: 'circle',
            }
        })

        sigma.renderers.def = sigma.renderers.canvas;
        s.addRenderer({
            container: 'graph-container'
            // type: "webgl"
        })

        var myRenderer = s.renderers[0];
        myRenderer.glyphs();
        myRenderer.bind('render', function (e) {
            myRenderer.glyphs();
        });

        let activeState = sigma.plugins.activeState(s);
        let dragListener = sigma.plugins.dragNodes(s, s.renderers[0], activeState);
        let select = sigma.plugins.select(s, activeState);
        let keyboard = sigma.plugins.keyboard(s, s.renderers[0]);
        select.bindKeyboard(keyboard);
        sigma.canvas.edges.autoCurve(s);
        dragListener.bind('startdrag', function (event) {
            console.log("startdrag", event.node);
            state.selectedNode(event.data.node)
        });
        // dragListener.bind('drag', function(event) {
        //     console.log(event);
        // });
        // dragListener.bind('drop', function(event) {
        //     console.log(event);
        // });
        // dragListener.bind('dragend', function(event) {
        //     console.log(event);
        // });


        let fa = sigma.layouts.configForceLink(s, {
            worker: true,
            autoStop: true,
            background: false,
            easing: 'cubicInOut',
            scaleRatio: 3,
            gravity: 30
        });

        console.log("draw")

        setInterval(() => {
            sigma.layouts.stopForceLink();
        }, 3000)

        // fa.bind('start stop', (e) => console.log(e.type))
        sigma.layouts.startForceLink();
        s.refresh()
    }
}

export default graphSigma