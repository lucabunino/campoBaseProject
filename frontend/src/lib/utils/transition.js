// Easing
import { quadInOut } from 'svelte/easing'

// Transitions to be used across app
export function workaround({ delay, duration, easing = quadInOut, customValue, pageHeight }) {
  let virtual_duration = delay + duration
  return {
    customValue,
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
        opacity: 0;
        // -webkit-transform: translateY(${(1 - eased) * 100}vw) translateZ(0);
        // -moz-transform: translateY(${(1 - eased) * 100}vw) translateZ(0);
        // -ms-transform: translateY(${(1 - eased) * 100}vw) translateZ(0);
        // transform: translateY(${(1 - eased) * 100}vw) translateZ(0);
        // right: ${-(1 - eased) * 100}vw;
      `;
    }
  };
}

export function pageOut(node, { delay, duration, customValue }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        position: absolute;
        margin-top: -${customValue}px;
        opacity: ${eased};
        // top: ${-(1 - eased) * 120}vw;
        // -webkit-transform: translateY(${-(1 - eased) * 100}vw) translateZ(0);
        // -moz-transform: translateY(${-(1 - eased) * 100}vw) translateZ(0);
        // -ms-transform: translateY(${-(1 - eased) * 100}vw) translateZ(0);
        // transform: translateY(${-(1 - eased) * 100}vw) translateZ(0);
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

export function newsletterInOut(node, { delay, duration, customValue }) {
  return {
    delay,
    duration,
    css: (t) => {
      const eased = quadInOut(t);
      return `
        margin-top: -${customValue}px;
        -webkit-transform: translateX(${(1 - eased) * 150}%) translateZ(0);
        -moz-transform: translateX(${(1 - eased) * 150}%) translateZ(0);
        -ms-transform: translateX(${(1 - eased) * 150}%) translateZ(0);
        transform: translateX(${(1 - eased) * 150}%) translateZ(0);
      `;
    }
  };
}