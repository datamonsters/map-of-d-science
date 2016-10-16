import './components/editor/edit-menu';
import './components/editor';
import graphlayer from './components/root/graph-layer';
import bglayer from'./components/root/bg-layer';
import uilayer from './components/root/ui-layer';

import "./components/head-up-display"
import './components/graph-container'
import './components/info-div'
import "./components/welcome"

import './components/root';
import state from "./data/state"
import {Arts} from "arts";
state.restore()



const spec = {
    "#e": () => {
        uilayer.place("editor")
        // bglayer.controller.tag.update()
        console.log(bglayer.controller)

        // console.log(bglayer)
        bglayer.controller.editor()
        // graphlayer.place("graph-container")
    },
    "": () => {
        uilayer.place("welcome")
        // graphlayer.place("graph-container")
    }
}

Arts.route(spec)
