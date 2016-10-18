import {AController, Tag} from "arts";
import state from "../../../data/state";
import {A} from "alak";

export default class SelectDatasetController implements AController {
    opt: any
    tag: Tag
    selected =  A.start()
    oncreate(opt: any, tag: any) {
        tag.listSelect = x => {
            let item = x.item
            $(".modalcontent .item").removeClass("active")
            $("#" + item.name).addClass("active")
            this.selected(item)
        }
        this.selected.on(i=>{
            console.log(i)
            this.tag.update({
                item:i
            })
        })
    }

    onmount() {

        state.graphList.on(list => {
            this.tag.update({
                list: R.values(list)
            })
        })

        // state.graphList.once(x => {
        //     $('.ui.modal')
        //         .modal({
        //             "onVisible": () => {
        //                 $('.ui.modal').modal('refresh')
        //             }
        //         })
        //         .modal('show')
        // })
    }

}