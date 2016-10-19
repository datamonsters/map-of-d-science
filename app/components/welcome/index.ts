import {Arts} from "arts"
import "./welcome.style.css"
import WelcomeCtrlClass from './welcome.controller'
const template = require("html!./welcome.template.html")

export default Arts.controller<WelcomeCtrlClass>('welcome', template, WelcomeCtrlClass)