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

async function loadRSS() {
  const url = "https://www.heise.de/security/rss/news-atom.xml";
  const rssContainer = document.getElementById("rss-feed");

  try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const xml = parser.parseFromString(text, "application/xml");

      const items = xml.querySelectorAll("entry");
      rssContainer.innerHTML = ""; // Inhalt resetten

      let articles = [];

      items.forEach((item, index) => {
          if (index < 5) { // Max. 5 Artikel anzeigen
              const title = item.querySelector("title").textContent;
              const link = item.querySelector("link").getAttribute("href");

              const li = document.createElement("li");
              li.innerHTML = `<a href="${link}" target="_blank">${title}</a>`;
              articles.push(li);
          }
      });

      // Dupliziere die Artikel für den Endlos-Scroll
      articles.forEach(li => rssContainer.appendChild(li.cloneNode(true)));
      articles.forEach(li => rssContainer.appendChild(li.cloneNode(true)));

      startScrolling();
  } catch (error) {
      rssContainer.innerHTML = "<p>RSS-Feed konnte nicht geladen werden.</p>";
      console.error("RSS-Feed Fehler:", error);
  }
}

function startScrolling() {
  const rssContainer = document.getElementById("rss-feed");
  let scrollAmount = 0;
  const speed = 1; // Geschwindigkeit des Scrolls

  function scroll() {
      scrollAmount += speed;
      rssContainer.scrollTop = scrollAmount;

      if (scrollAmount >= rssContainer.scrollHeight / 2) {
          scrollAmount = 0; // Zurücksetzen für Endlos-Scroll
      }

      requestAnimationFrame(scroll);
  }

  scroll();
}

loadRSS();

async function fetchLatestVBSPost() {
  const url = "https://api.codetabs.com/v1/proxy?quest=https://www.vbs.admin.ch/de/mitteilungen";
  console.log("Fetching:", url);

  try {
      const response = await fetch(url);
      const text = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(text, "text/html");

      // Neusten Beitrag suchen
      const latestPost = doc.querySelector("a.btn.btn--outline.btn--base.btn--icon-only");
      
      if (latestPost) {
          const postUrl = "https://www.vbs.admin.ch" + latestPost.getAttribute("href");
          console.log("Neuster Beitrag:", postUrl);
          generateQRCode(postUrl);
      } else {
          console.log("Kein Beitrag gefunden!");
      }
  } catch (error) {
      console.error("Fehler beim Abrufen des neuesten Beitrags:", error);
  }
}

// QR-Code generieren
function generateQRCode(url) {
  const qrcodeContainer = document.getElementById("qrcode");
  qrcodeContainer.innerHTML = "";
  new QRCode(qrcodeContainer, {
      text: url,
      width: 250,
      height: 250,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
  });
}

// Beim Laden der Seite starten
document.addEventListener("DOMContentLoaded", fetchLatestVBSPost);
