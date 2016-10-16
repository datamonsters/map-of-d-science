import {Arts} from "arts";
import "./edit-menu.style.css"
import EditMenuControllerClass from './edit-menu.controller';
const template = require("html!./edit-menu.template.html")

export default Arts.controller<EditMenuControllerClass>('edit-menu', template, EditMenuControllerClass)