let dateContainer = document.querySelector(".date-container");
let clockContainer = document.querySelector(".clock-container");
const weekdays = [
  "Sonntag",
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
];
const monthNames = [
  "Januar",
  "Februar",
  "März",
  "April",
  "Mai",
  "Juni",
  "Juli",
  "August",
  "September",
  "Oktober",
  "November",
  "Dezember",
];
const dateClock = setInterval(function dateTime() {
  const today = new Date();
  let date = today.getDate();
  let day = weekdays[today.getDay()];
  let month = monthNames[today.getMonth()];
  let hours = today.getHours();
  let minutes = today.getMinutes();
  minutes = minutes < 10 ? "0" + minutes : minutes;
  dateContainer.innerHTML = `<p>${day}</p><p><span>${date}</span></p><p>${month}</p>`;
  clockContainer.innerHTML = `${hours}:${minutes}`;
}, 1000);