import {Arts} from "arts";
import "./welcome.style.css"
import constructor from './welcome.component';
const template = require("html!./welcome.template.html")

const startComponent = Arts.component('welcome', template, constructor)
export default startComponent