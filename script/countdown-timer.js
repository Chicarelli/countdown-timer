let elements;
let timer;
const LOCALSTORAGE_KEY = "timer";
const YEAR = new Date().getFullYear();
const DAYS_MS = 86400000;
const HOURS_MS = 3600000;
const MINUTES_MS = 60000;
const SECONDS_MS = 1000;

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

function startCountdown() {
  //TODO: Alteração de estilos para aparecer a hora.
  updateCountdown();
}

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

function updateCountdown() {
  const now = new Date().getTime();
  const target = new Date(getTime()).getTime();
  console.log({ target });
  const difference = target - now;

  if (difference <= 0) {
    clearInterval(timer);
    return;
  }

  const days = difference / DAYS_MILLISECONDS;
  const hours = (difference % DAYS_MILLISECONDS) / HOURS_MILLISECONDS;
  const minutes =
    ((difference % DAYS_MILLISECONDS) % HOURS_MILLISECONDS) /
    MINUTES_MILLISECONDS;
  const seconds =
    (((difference % DAYS_MILLISECONDS) % HOURS_MILLISECONDS) %
      MINUTES_MILLISECONDS) /
    SECONDS_MS;

  console.log({
    now,
    target,
    difference: target - now,
  });
}
