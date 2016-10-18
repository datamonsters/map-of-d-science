import {Arts} from "arts";
import "./editor.style.css"
import constructor from './editor.component';
const template = require("html!./editor.template.html")

const startComponent = Arts.component('editor', template, constructor)
export default startComponent