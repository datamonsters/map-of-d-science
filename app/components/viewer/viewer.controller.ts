import {AController, Tag} from "arts";

export default class ViewerController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
        console.log("viewer component mount", opt)
    }
    //
    onmount() {
        console.log("viewer component mount", this.opt)
    }

}