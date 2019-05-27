export function easeOut(t: number, b: number, c:number, d:number): number {
    const ts = (t /= d) * t;
    const tc = ts * t;
    return b + c * (tc + -3 * ts + 3 * t);
}

export function arcToDegree(arc: number): number {
    return arc * 180 / Math.PI;
}
