import {Arts} from "arts";
import "./root.style.css"
import constructor from './root.component';
const template = require("html!./root.template.html")

const startComponent = Arts.component('root', template, constructor)
export default startComponent