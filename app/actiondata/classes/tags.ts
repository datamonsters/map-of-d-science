import state from "../state";
import {IndexOf} from "alak";
import BaseNode from "./node.class";
/**
 * Created by dev@gleb.pw on 02.11.2016.
 */

export function tagRawParser(raw: string) {
    let createdTags: IndexOf<BaseTag> = {}

    function tagFabriqe(tagId: string, node:BaseNode): BaseTag {
        let tag: BaseTag = createdTags[tagId]
        if (!tag) tag = createdTags[tagId] = new BaseTag(tagId)
        tag.nodes[node.id] = node
        return tag
    }

    let lines = raw.split('\n')
    let tags: BaseTag[] = []
    let tag: BaseTag


    lines.forEach((l) => {
        let val = l.split(';')
        let node = BaseNode.names[val[0]]
        if (node) {
            let tagsString = val[1]
            if (tagsString) {
                tagsString = tagsString.substring(0, tagsString.length - 1);
                node.tags = tagsString.split(',').map(t => tagFabriqe(t, node))
            }
        }
    })

    return createdTags
}


export class BaseTag {
    nodes: IndexOf<BaseNode> = {}
    constructor(
        public name: string
    ) {

    }
}
//
// state.selectedTag.on(tag=>{
//     tag.nodes.
//     tag.nodes.forEach(n=>{
//         n.state = "tag"
//     })
// })