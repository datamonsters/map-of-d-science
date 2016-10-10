import BaseNode from "./basenode.class";
export class BaseData {
    constructor(public nodes: BaseNode[],
                public edges: any,
                public sub: any) {
    }
}