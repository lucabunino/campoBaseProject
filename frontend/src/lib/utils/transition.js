// Easing
import { quadInOut } from 'svelte/easing'

// Transitions to be used across app
export function workaround({ delay, duration, easing = quadInOut, marginTop, pageHeight }) {
  let virtual_duration = delay + duration
  return {
    marginTop,
    pageHeight,
    duration: virtual_duration,
    easing: (x) => 
      x < delay / virtual_duration
        ? 0
        : easing((x - delay / virtual_duration) / (1 - delay / virtual_duration)),
  };
}

export function pageIn(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        opacity: ${eased};
        // -webkit-transform: translateY(${(1 - eased) * 100}vw) translateZ(0);
        // -moz-transform: translateY(${(1 - eased) * 100}vw) translateZ(0);
        // -ms-transform: translateY(${(1 - eased) * 100}vw) translateZ(0);
        // transform: translateY(${(1 - eased) * 100}vw) translateZ(0);
        // right: ${-(1 - eased) * 100}vw;
      `;
    }
  };
}

export function pageOut(node, { delay, duration, marginTop }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        position: absolute;
        margin-top: -${marginTop}px;
        // top: ${-(1 - eased) * 120}vw;
        opacity: ${eased};
        // -webkit-transform: translateY(${-(1 - eased) * 100}vw) translateZ(0);
        // -moz-transform: translateY(${-(1 - eased) * 100}vw) translateZ(0);
        // -ms-transform: translateY(${-(1 - eased) * 100}vw) translateZ(0);
        // transform: translateY(${-(1 - eased) * 100}vw) translateZ(0);
      `;
    }
  };
}

export function loaderIn(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        // opacity: ${eased};
      `;
    }
  };
}

export function loaderOut(node, { delay, duration }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        // opacity: ${eased};
      `;
    }
  };
}