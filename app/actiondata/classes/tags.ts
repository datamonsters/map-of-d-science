/**
 * Created by dev@gleb.pw on 02.11.2016.
 */

export class tags {
    static index: any = {}

    static parser(raw: string) {
        let lines = raw.split('\n')
        lines.forEach((l) => {
            let val = l.split(';')
            if (val[1]) {
                tags.index[val[0]] = val[1].split(',')
            }

        })
        return tags.index
    }
}