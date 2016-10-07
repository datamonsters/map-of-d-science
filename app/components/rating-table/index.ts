
import {Arts} from "arts";
import "./rating-table.css"
import constructor from './rating-table'
const name = "rating-table"
const template = require("html!./" + name + ".html")

const startComponent = Arts.component(name, template, constructor)
export default startComponent


