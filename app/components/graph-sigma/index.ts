import {Arts} from "arts"
import "./graph-sigma.style.css"
import GraphSigmaCtrlClass from './graph-sigma.controller'
const template = require("html!./graph-sigma.template.html")

export default Arts.controller<GraphSigmaCtrlClass>('graph-sigma', template, GraphSigmaCtrlClass)