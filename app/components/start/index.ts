

import {Arts} from "arts";
import "./start.css"
import constructor from './start'
// import {A} from "alak";
const name = "start"
const template = require("html!./" + name + ".html")

const startComponent = Arts.component(name, template, constructor)
export default startComponent