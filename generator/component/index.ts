import {Arts} from "arts"
import "./<%= name %>.style.css"
import <%= upCaseName %>CtrlClass from './<%= name %>.controller'
const template = require("html!./<%= name %>.template.html")

export default Arts.controller<<%= upCaseName %>CtrlClass>('<%= name %>', template, <%= upCaseName %>CtrlClass)