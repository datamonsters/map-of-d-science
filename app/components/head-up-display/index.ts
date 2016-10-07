
import {Arts} from "arts";
import "./head-up-display.css"
import constructor from './head-up-display'
const name = "head-up-display"
const template = require("html!./" + name + ".html")

const startComponent = Arts.component(name, template, constructor)
export default startComponent


