import './components/graph-sigma';

import './components/editor/select-dataset';
import './components/editor/edit-menu';
import './components/editor';

import './components/viewer/info-pane';
import './components/viewer';


import graphlayer from './components/root/graph-layer';
import bglayer from'./components/root/bg-layer';
import uilayer from './components/root/ui-layer';


import "./components/welcome"

import './components/root'
import {Arts} from "arts"
import state from "./data/state";



const spec = {
    "#e": () => {
        uilayer.place("editor")
        // state.editMode(true)
        bglayer.controller.editor()
        graphlayer.place("graph-sigma", {
            edit:false
        })
        state.editMode(true)
    },
    "#v": () => {
        let opt = {
            edit:false
        }
        graphlayer.place("graph-sigma", opt)
        uilayer.place("viewer", opt)
        state.editMode(false)
        bglayer.controller.viewer()
    },
    "": () => {
        uilayer.place("welcome")
    }
}

Arts.route(spec)