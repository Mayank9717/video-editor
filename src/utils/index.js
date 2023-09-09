export function getUid() {
  return Math.random().toString(36).substring(2, 9);
}

export function isHtmlVideoElement(element) {
  if (!element) return false;
  return element.tagName === "VIDEO";
}

export function isHtmlImageElement(element) {
  if (!element) return false;
  return element.tagName === "IMG";
}

export function isHtmlAudioElement(element) {
  if (!element) return false;
  return element.tagName === "AUDIO";
}

export function formatTimeToMinSec(time) {
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes}:${appendZero(seconds, 2)}`;
}

export function formatTimeToMinSecMili(time) {
  const mili = Math.floor((time % 1000) / 10);
  return `${formatTimeToMinSec(time / 1000)}.${appendZero(mili, 2)}`;
}

function appendZero(value, minDigits = 2) {
  return value.toString().padStart(minDigits, "0");
}
