export default (opt, tag)=> {
    tag.on("mount", ()=>{
        console.log("component mount: root")

    })
}