export default (opt, tag)=> {
    tag.on("mount", ()=>{
        console.log("root component mount")

    })
}