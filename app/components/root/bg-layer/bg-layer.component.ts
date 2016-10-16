import {AController, Tag} from "arts";

export default class BgLayerController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
    }

    onmount() {
    }



    editor() {
        let allstars = document.getElementById("allstars")
        TweenLite.to(allstars, 2, {
            opacity:0.57,
            // blur:99
        })

        let blurElement = {a:0};//start the blur at 0 pixels

        TweenMax.to(blurElement, 10, {a:3, onUpdate:applyBlur});
        function applyBlur() {
            TweenMax.set(['#allstars'], {webkitFilter:"blur(" + blurElement.a + "px)",filter:"blur(" + blurElement.a + "px)"});
        }

        let colorful = document.getElementById("colorful")
        TweenLite.to(colorful, 2, {
            opacity:.5
        })
    }

}