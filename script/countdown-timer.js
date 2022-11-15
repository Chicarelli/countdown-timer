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
    daysInput: document.getElementById("timer_days"),
    hoursInput: document.getElementById("timer_hours"),
    minutesInput: document.getElementById("timer_minutes"),
    secondsInput: document.getElementById("timer_seconds"),
    stopButton: document.getElementById("stop-button"),
  };

  elements.stopButton.addEventListener("click", handleStop);

  preloadData();

  if (getTime()) {
    startCountdown();
  } else {
    handleStop();
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
  if (new Date(getTime()).getFullYear() - new Date().getFullYear() > 5)
    return handleStop();

  const now = new Date().getTime();
  const target = new Date(getTime()).getTime();
  const difference = target - now;

  if (difference <= 0) {
    alert("it' s done");
    handleStop();
    return;
  }

  const days = Math.floor(difference / DAYS_MS);
  const hours = Math.floor((difference % DAYS_MS) / HOURS_MS);
  const minutes = Math.floor(((difference % DAYS_MS) % HOURS_MS) / MINUTES_MS);
  const seconds = Math.floor(
    (((difference % DAYS_MS) % HOURS_MS) % MINUTES_MS) / SECONDS_MS
  );

  updateCountdownElements({ days, hours, minutes, seconds });

  if (!timer) {
    timer = setInterval(updateCountdown, 1000);
  }
}

function updateCountdownElements({ days, hours, minutes, seconds }) {
  if (isNaN(days) || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
    alert("Insira uma data válida");
    return handleStop();
  }

  elements.daysInput.value = formatInput(days);
  elements.hoursInput.value = formatInput(hours);
  elements.minutesInput.value = formatInput(minutes);
  elements.secondsInput.value = formatInput(seconds);
}

function formatInput(value) {
  return value.toString().length === 1 ? `0${value}` : value;
}

function handleStop() {
  clearInterval(timer);
  updateCountdownElements({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  removeTime();
  timer = null;
}
