import './components/editor/select-dataset';
import './components/editor/edit-menu';
import './components/editor';

import './components/viewer/info-pane';
import './components/viewer';


import graphlayer from './components/root/graph-layer';
import bglayer from'./components/root/bg-layer';
import uilayer from './components/root/ui-layer';


import './components/graph-container'
import "./components/welcome"

import './components/root';
import state from "./data/state"
import {Arts} from "arts";
state.restore()



const spec = {
    "#e": () => {
        uilayer.place("editor")
        bglayer.controller.editor()
    },

    "#v": () => {
        uilayer.place("viewer")
        bglayer.controller.viewer()
    },
    "": () => {
        uilayer.place("welcome")
    }
}

Arts.route(spec)
