import {Arts} from "arts"
import "./zoom.style.css"
import ZoomCtrlClass from './zoom.controller'
const template = require("html!./zoom.template.html")

export default Arts.controller<ZoomCtrlClass>('zoom', template, ZoomCtrlClass)