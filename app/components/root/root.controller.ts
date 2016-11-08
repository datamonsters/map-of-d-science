import {AController, Tag} from "arts";



export default class RootController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
        console.log("component create: root ")
    }
    onmount() {
        // console.log("component mount: root")
    }

}