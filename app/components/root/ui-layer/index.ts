import {Arts} from "arts";
import "./ui-layer.style.css"
import constructor from './ui-layer.component';
const template = require("html!./ui-layer.template.html")

const startComponent = Arts.component('ui-layer', template, constructor)
export default startComponent