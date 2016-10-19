export default class DataStream {
    private xhr = new XMLHttpRequest()
    public url: string

    constructor(parser) {
        this.xhr.onreadystatechange = ()=> {
            if (this.xhr.readyState === 4) {
                if (this.xhr.status === 200) {
                    let data = parser(this.xhr.responseText)
                    if (this._next) this._next(data)
                } else {
                    console.log("datastream Error", this.xhr.statusText);
                }
            }
        }
    }

    private _next: Function

    public on(fn): DataStream {
        this._next = fn
        return this
    }

    load(newurl?: string): DataStream {
        if (newurl) {
            this.url = newurl
        }
        console.log("datastream load ", this.url);
        this.xhr.open('GET', this.url, true);
        this.xhr.send(null);
        return this
    }

}