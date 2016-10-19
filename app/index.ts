import './components/root';
import './components/welcome';
import './components/graph-sigma';
//
import './components/editor/select-dataset';
import './components/editor/edit-menu';
import './components/editor';
//
import './components/viewer/info-pane';
import './components/viewer';


import {Arts} from "arts"


let opt
const spec = {
    "#e": () => {
        opt = {editmode: true}
        Arts.mount("#layerUi", "editor", opt)
        Arts.mount("#layerGraph", "graph-sigma", opt)
    },
    "#v": () => {
        opt = {editmode: false}
        Arts.mount("#layerUi", "viewer", opt)
        Arts.mount("#layerGraph", "graph-sigma", opt)
    },
    "": () => {
        console.log(Arts.mount("#layerUi", "welcome"))
    }
}

Arts.route(spec)