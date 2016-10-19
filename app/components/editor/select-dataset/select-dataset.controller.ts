import {AController, Tag} from "arts";
import state from "../../../data/state";
import {A} from "alak";

export default class SelectDatasetController implements AController {
    opt: any
    tag: Tag
    selected

    oncreate(opt: any, tag: any) {
        tag.listSelect = x => {
            let item = x.item
            $(".modalcontent .item").removeClass("active")
            $("#" + item.name).addClass("active")
            this.selected= item
            this.tag.update({
                item: item
            })
        }

        tag.done = () => {
            state.dataSet.loadGraphByInfo(this.selected)
        }

    }

    onmount() {

        state.infoGraphs.on(list => {
            this.tag.update({
                list: R.values(list)
            })
        })


        // state.infoGraphs.once(x => {
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