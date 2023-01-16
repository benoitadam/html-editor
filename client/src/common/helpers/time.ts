import { toNbr } from "./to";

export const SECOND = 1000;
export const MINUTE = 60 * SECOND;
export const HOUR = 60 * MINUTE;
export const DAY = 24 * HOUR;

let _offset = 0;
export const timeInitOffset = (serverTime: number) => {
    _offset = serverTime - Date.now();
}

export const timeNow = () => {
    return Date.now() + _offset;
}

export const timeSplit = (str: string) => {
    const [h, m, s] = str.split(':').map((v) => toNbr(v, 0));
    return { h, m, s };
}

export const timeParse = (str: string) => {
    const [h, m, s] = str.split(':').map((v) => toNbr(v, 0));
    const time = h * HOUR + m * MINUTE + s * SECOND;
    console.debug('timeParse', { str, h, m, s, time });
    return time;
}

export const timeStringify = (time: number) => {
    const h = (time % DAY) / HOUR | 0;
    const m = (time % HOUR) / MINUTE | 0;
    const s = (time % MINUTE) / SECOND | 0;
    const p2 = (n: number) => String(n).padStart(2, '0');
    const str = `${p2(h)}:${p2(m)}:${p2(s)}`
    // console.debug('timeStringify', { time, h, m, s,  });
    return str;
}