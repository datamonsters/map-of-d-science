import {AController, Tag} from "arts";
let allstars
let colorful
export default class BgLayerController implements AController {
    opt: any
    tag: Tag

    oncreate(opt: any, tag: any) {
    }

    onmount() {

        allstars = document.getElementById("allstars")
        colorful = document.getElementById("colorful")

        TweenLite.to(allstars, 2, {
            opacity: 0.7,
            // blur:99
        })

        let blurElement = {a: 0};//start the blur at 0 pixels
        TweenMax.to(blurElement, 10, {
            a: 3, onUpdate: () => {
                TweenMax.set(['#allstars'], {
                    webkitFilter: "blur(" + blurElement.a + "px)",
                    filter: "blur(" + blurElement.a + "px)"
                })
            }
        });
        TweenLite.to(colorful, 2, {
            opacity:.1
        })
    }

    viewer() {

        TweenLite.to(document.getElementsByTagName("bg-layer"), 2, {
            opacity: 0
        })
        TweenLite.to(colorful, 2, {
            opacity: 0
        })
        TweenLite.to(allstars, 2, {
            opacity: 0,
            onComplete:()=>{

                allstars.style.visibility = 'hidden';
            }
        })
    }
    editor() {
        TweenLite.to(colorful, 2, {
            opacity: 0.7
        })
        TweenLite.to(allstars, 2, {
            opacity: 0,
            onComplete:()=>{

                allstars.style.visibility = 'hidden';
            }
        })
    }
}