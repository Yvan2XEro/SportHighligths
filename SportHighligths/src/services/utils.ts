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