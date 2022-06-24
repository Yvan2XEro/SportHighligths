import moment from "moment";


export const numConverter = (n: number, d: number = 2) => {
    if (!n) return 0;
    let x = ('' + n).length;
    d = Math.pow(10, d)
    x -= x % 3
    return Math.round(n * d / Math.pow(10, x)) / d + " kMGTPE"[x / 3]
}

export const formatDate = (date: Date) => {
    const diff = moment().diff(date, 'days');
    if (diff < 1) {
        return moment(date).fromNow();
    }
    return moment(date).format('MMM DD, YYYY');
}

export function textSice(text: string, size = 20): string {
    if (text.length <= size)
        return text;
    return text.substring(0, size) + '...';
}

export function uniqueid(length = 16): string {
    // always start with a letter (for DOM friendlyness)
    var idstr = String.fromCharCode(Math.floor((Math.random() * 25) + 65));
    do {
        // between numbers and characters (48 is 0 and 90 is Z (42-48 = 90)
        var ascicode = Math.floor((Math.random() * 42) + 48);
        if (ascicode < 58 || ascicode > 64) {
            // exclude all chars between : (58) and @ (64)
            idstr += String.fromCharCode(ascicode);
        }
    } while (idstr.length < length);

    return (idstr);
}


export function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
