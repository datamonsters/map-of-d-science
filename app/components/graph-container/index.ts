
import {Arts} from "arts";
import "./graph-container.css"
import constructor from './graph-container'
const name = "graph-container"
const template = require("html!./" + name + ".html")

const startComponent = Arts.component(name, template, constructor)
export default startComponent


