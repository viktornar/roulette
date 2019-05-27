import { findIndex } from 'lodash';

import { ROULETTE_OPTIONS } from "./settings";

export function easeOut(t: number, b: number, c:number, d:number): number {
  const ts = (t /= d) * t;
  const tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

export function arcToDegree(arc: number): number {
  return arc * 180 / Math.PI;
}

export function startTimer(duration: number, cb: (min: number, sec: number) => void) {
  let timer = duration;
  const intervalRef = setInterval(() => {
    const minutes = parseInt(String(timer / 60), 10);
    const seconds = parseInt(String(timer % 60), 10);

    cb(minutes, seconds);

    if (--timer < 0) {
        clearInterval(intervalRef);
    }
  }, 1000);
}

export function getWheelFieldIndexFromResult(result: number | null): number | null  {
  return findIndex(ROULETTE_OPTIONS, ({ value }) => String(value) === String(result));
}
