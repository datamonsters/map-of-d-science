export default (opt, tag)=> {
    tag.on("mount", ()=>{
        console.log("ui-layer component mount")

    })
}