import {Arts} from "arts";
import "./graph-layer.style.css"
import constructor from './graph-layer.component';
const template = require("html!./graph-layer.template.html")

const startComponent = Arts.component('graph-layer', template, constructor)
export default startComponent