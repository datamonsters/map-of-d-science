import {Arts} from "arts"
import "./select-dataset.style.css"
import SelectDatasetControllerClass from './select-dataset.controller'
const template = require("html!./select-dataset.template.html")

export default Arts.controller<SelectDatasetControllerClass>('select-dataset', template, SelectDatasetControllerClass)