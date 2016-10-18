export default (opt, tag)=> {
    tag.on("mount", ()=>{
        console.log("welcome component mount")

    })
}