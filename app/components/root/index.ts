import {Arts} from "arts"
import "./root.style.css"
import RootCtrlClass from './root.controller'
const template = require("html!./root.template.html")

export default Arts.controller<RootCtrlClass>('root', template, RootCtrlClass)