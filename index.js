console.log('Start JS');

var current_view = 0;
const views = ["krypto", "feeds", "weather"]

const weekdays = [
    "Sonntag",
    "Montag",
    "Dienstag",
    "Mittwoch",
    "Donnerstag",
    "Freitag",
    "Samstag"
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
    "Dezember"
];

const currentWeather = 'sun';

const weatherColors = {
    'sun':'linear-gradient(52deg, rgba(0,80,255,1) 0%, rgba(0,213,255,1) 100%',
    'rain':'linear-gradient(52deg, rgba(49,49,113,1) 0%, rgba(94,106,143,1) 100%)'
};

const weatherBorderColors = {
    'sun':'rgba(0,80,255,1)',
    'rain':'rgba(49,49,113,1)'
};

const current_weather_input = document.getElementById('current_weather');
const current_time_input = document.getElementById('current_time');

function updateView() {
    document.getElementById(views[current_view]).scrollIntoView({
        behavior: "auto",
        block: "start"
    })
    current_view = (current_view+1)%3
}

function updateWeather() {
    document.getElementById('morgen').style.background = weatherColors[document.getElementById('current_weather').value];
    document.querySelector(":root").style.setProperty('--morgenBorderColor', weatherBorderColors[document.getElementById('current_weather').value]);
    document.getElementById('mittag').style.background = weatherColors[document.getElementById('current_weather').value];
    document.querySelector(":root").style.setProperty('--mittagBorderColor', weatherBorderColors[document.getElementById('current_weather').value]);
    document.getElementById('abend').style.background = weatherColors[document.getElementById('current_weather').value];
    document.querySelector(":root").style.setProperty('--abendBorderColor', weatherBorderColors[document.getElementById('current_weather').value]);
}

function updateTime() {
    time_span.innerText = document.getElementById('current_time').value;
}

function formatNumber(n) {
    var t = [];

    n = Number(n).toFixed(2).split('.');

    for (var iLen = n[0].length, i = iLen? iLen % 3 || 3 : 0, j = 0; i <= iLen; i+=3) {
            t.push(n[0].substring(j, i));
        j = i;
    }

    return t.join("'") + (n[1]? "." + n[1] : '');
}

function updateCrypto() {
    document.getElementById("bitcoin_wert").innerText = formatNumber(85357.79)
}

function formatTime(hours, minutes) {
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
};

var updateTimeVar = setInterval(function setTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    let day = weekdays[now.getDay()];
    let date = now.getDate();
    let month = monthNames[now.getMonth()];
    let year = now.getFullYear();
    const formattedTime = formatTime(hours, minutes);
    let time_span = document.getElementById('time_span')
    let calendar_day = document.getElementById('calendar_day')
    let calendar_date = document.getElementById('calendar_date')
    let calendar_month = document.getElementById('calendar_month')
    let calendar_year = document.getElementById('calendar_year')
    if (seconds == 0) {
        time_span.innerText = formattedTime;
        updateView();
    }
    if (hours == 0) {
        calendar_day.innerText = day;
        calendar_date.innerText = date;
    }
    if (minutes%5==0) {
        updateCrypto()
    }
    if (date == 1) {
        calendar_month.innerText = month;
    }
    if (month == 1) {
        calendar_year.innerText = year;
    }
    document.getElementById('morgen').style.background = weatherColors[0]
    document.getElementById('mittag').style.background = weatherColors[0]
    document.getElementById('abend').style.background = weatherColors[0]
    if (time_span.style.opacity == 0) {
        console.log("Start")
        document.title = "Dashboard - " + day + ", " + date + ". " + month + " " + year
        updateCrypto()
        time_span.innerText = formattedTime;
        calendar_day.innerText = day;
        calendar_date.innerText = date;
        calendar_month.innerText = month;
        calendar_year.innerText = year;
        time_span.style.opacity = '1'
        calendar_day.style.opacity = '1'
        calendar_date.style.opacity = '1'
        calendar_month.style.opacity = '1'
        calendar_year.style.opacity = '1'
        document.getElementById('morgen').style.opacity = '1';
        document.getElementById('morgen').style.background = weatherColors[document.getElementById('current_weather').value];
        document.getElementById('mittag').style.opacity = '1';
        document.getElementById('mittag').style.background = weatherColors[document.getElementById('current_weather').value];
        document.getElementById('abend').style.opacity = '1';
        document.getElementById('abend').style.background = weatherColors[document.getElementById('current_weather').value];
        document.querySelector(":root").style.setProperty('--morgenBorderColor', weatherBorderColors[document.getElementById('current_weather').value]);
        document.querySelector(":root").style.setProperty('--mittagBorderColor', weatherBorderColors[document.getElementById('current_weather').value]);
        document.querySelector(":root").style.setProperty('--abendBorderColor', weatherBorderColors[document.getElementById('current_weather').value]);
        document.getElementById('current_time').value = formattedTime;
    }
}, 1000);

var updateWeatherVar = setInterval(function updateWeather() {
    document.getElementById('morgen').style.background = weatherColors[document.getElementById('current_weather').value];
    document.getElementById('mittag').style.background = weatherColors[document.getElementById('current_weather').value];
    document.getElementById('abend').style.background = weatherColors[document.getElementById('current_weather').value];
    document.querySelector(":root").style.setProperty('--morgenBorderColor', weatherBorderColors[document.getElementById('current_weather').value]);
    document.querySelector(":root").style.setProperty('--mittagBorderColor', weatherBorderColors[document.getElementById('current_weather').value]);
    document.querySelector(":root").style.setProperty('--abendBorderColor', weatherBorderColors[document.getElementById('current_weather').value]);
}, 60000)

function onpageload() {
    console.log("Page loaded")
}

function doStuff() {
    tsParticles.load("tsparticles", {
        background: {
            color: null // Setting color to null makes the background transparent
        },
        particles: {
            color: {
                value: "#fff"
            },
            move: {
                direction: "bottom",
                enable: true,
                outModes: "out",
                speed: 2
            },
            number: {
                density: {
                    enable: true,
                    area: 800
                },
                value: 400
            },
            opacity: {
                value: 0.8
            },
            shape: {
                type: "circle"
            },
            size: {
                value: 10
            },
            wobble: {
                enable: true,
                distance: 10,
                speed: 10
            },
            zIndex: {
                value: {
                    min: 0,
                    max: 100
                }
            }
        }
    });
}