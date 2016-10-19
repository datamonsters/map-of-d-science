import {A} from "alak";
import moment from "moment"
export class InfoGraph {
    edgesCount
    nodesCount
    id
    name
    time
    pusher: any
    date: string

    constructor(raw) {
        A.assign(this, raw)
        this.time = +this.time
        this.date = moment(this.time).format('MMMM Do YYYY, HH:mm:ss ')
    }
}