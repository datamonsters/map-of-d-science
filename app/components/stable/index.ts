import './stable.css'
import {Arts} from "arts";
import constructor from './stable'
const name = "stable"
const template = require("html!./" + name + ".html")

const startComponent = Arts.component(name, template, constructor)
export default startComponent
