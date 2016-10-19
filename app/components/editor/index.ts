import {Arts} from "arts"
import "./editor.style.css"
import EditorCtrlClass from './editor.controller'
const template = require("html!./editor.template.html")

export default Arts.controller<EditorCtrlClass>('editor', template, EditorCtrlClass)