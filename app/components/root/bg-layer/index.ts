import {Arts} from "arts";
import "./bg-layer.style.css"
import BgLayerController from './bg-layer.component';
const template = require("html!./bg-layer.template.html")


const BgLayerComponent = Arts.controller<BgLayerController>('bg-layer', template, BgLayerController)
export default BgLayerComponent





