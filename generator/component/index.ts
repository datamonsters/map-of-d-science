import {Arts} from "arts"
import "./<%= name %>.style.css"
import <%= upCaseName %>ControllerClass from './<%= name %>.controller'
const template = require("html!./<%= name %>.template.html")

export default Arts.component<<%= upCaseName %>ControllerClass>('<%= name %>', template, <%= upCaseName %>ControllerClass)