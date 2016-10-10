
import {Arts} from "arts";
import "./info-div.css"
import constructor from './info-div'
const name = "info-div"
const template = require("html!./" + name + ".html")

const startComponent = Arts.component(name, template, constructor)
export default startComponent


