import {Arts} from "arts"
import "./info-pane.style.css"
import InfoPaneCtrlClass from './info-pane.controller'
const template = require("html!./info-pane.template.html")

export default Arts.controller<InfoPaneControllerClass>('info-pane', template, InfoPaneCtrlClass)