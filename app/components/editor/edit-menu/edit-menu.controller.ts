import {AController, Tag} from "arts";

export default class EditMenuController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
        console.log("edit-menu component mount")
        tag.configure = () => {

                $('.ui.modal')
                    .modal('show')
        }
    }

    //
    // onmount() {
    //     console.log("edit-menu component mount")
    // }

}