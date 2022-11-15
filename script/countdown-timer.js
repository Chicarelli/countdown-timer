let elements;
const LOCALSTORAGE_KEY = "timer";
const YEAR = new Date().getFullYear();

document.addEventListener("DOMContentLoaded", function () {
  elements = {
    inputTimer: document.getElementById("input-timer"),
    buttonStart: document.getElementById("button-start"),
  };

  preloadData();

  if (getTime()) {
    startCountdown();
  }
});

document
  .getElementById("form-new-timer")
  .addEventListener("submit", handleNewTimer);

function handleNewTimer(event) {
  event.preventDefault();

  setTime(elements.inputTimer.value);
  startCountdown();
}

function preloadData() {
  let preConfiguredTime = getTime()
    ? getTime()
    : new Date(YEAR + 1, 0, 1, 0, 0, 0, 0).toISOString().replace(".000Z", "");

  elements.inputTimer.value = preConfiguredTime;
}

function startCountdown() {}

function stopCountdown() {
  removeTime();
}

function getTime() {
  return window.localStorage.getItem(LOCALSTORAGE_KEY);
}

function setTime(time) {
  window.localStorage.setItem(LOCALSTORAGE_KEY, time);
}

function removeTime() {
  window.localStorage.removeItem(LOCALSTORAGE_KEY);
}
