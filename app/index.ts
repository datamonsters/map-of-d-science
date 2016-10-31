import './components/viewer/zoom';
import './components/root';
import './components/welcome';
import './components/graph-sigma';
//
import './components/editor/select-dataset';
import './components/editor/edit-menu';
import './components/editor';
//
import './components/viewer';


import {Arts} from "arts"


Arts.route({
    "/edit": () => {
        Arts.globalScope({editmode: true})
        Arts.mount("#layerUi", "editor")
        Arts.mount("#layerGraph", "graph-sigma")
    },
    "#e": () => {
        Arts.globalScope({editmode: true})
        Arts.mount("#layerUi", "editor")
        Arts.mount("#layerGraph", "graph-sigma")
    },
    "": () => {
        Arts.globalScope({editmode: false})
        Arts.mount("#layerUi", "viewer")
        Arts.mount("#layerGraph", "graph-sigma")
    },
    "#": () => {
        console.log(Arts.mount("#layerUi", "welcome"))
    }
})