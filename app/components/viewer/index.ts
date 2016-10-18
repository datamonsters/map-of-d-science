import {Arts} from "arts"
import "./viewer.style.css"
import ViewerCtrlClass from './viewer.controller'
const template = require("html!./viewer.template.html")

export default Arts.controller<ViewerControllerClass>('viewer', template, ViewerCtrlClass)