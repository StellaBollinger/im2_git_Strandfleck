console.log('hallo script.js')

// OpenMeteo Loader
async function loadWeather() {
    const url = 'https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m,rain,weather_code,precipitation&ref=freepublicapis.com'; // mit korrekter API-URL ersetzen
    try {
        const response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.error(error);
        return false;
    }
}
const data = await loadWeather();
console.log(data); // gibt die Daten der API oder false in der Konsole aus

// unsere Wetterdaten ins HTML/DOM einfüllen
const weather_container = document.querySelector('.weather_container');
//  
`<p>Temperatur: ${data.current.temperature_2m}°C</p>
                             <p>Windgeschwindigkeit: ${data.current.wind_speed_10m} km/h</p>
                             <p>Niederschlag: ${data.current.precipitation} mm</p>
                             <p>Wettercode: ${data.current.weather_code}</p>`;
// OpenMeteo Loader Ende

const temp = document.querySelector('.celsius');
if (temp) {
    temp.innerText = `${data.current.temperature_2m}°C`;
}

const wind = document.querySelector('.wind_speed');
if (wind) {
    wind.innerText = `${data.current.wind_speed_10m} km/h`;
}

const regen = document.querySelector('.rain_mm');
if (regen) {
    regen.innerText = `${data.current.precipitation} mm`;
}


// Wettercode: 0 = klar, 1-3 = bewölkt, 45-48 = nebel, 51-55 = Nieselregen, 61-65 = Regen, 66-67 = Eisregen, 71-75 = Schnee, 77-86 = Schneeflocken, 80-82 = Regenschauer, 95-99 = Gewitter
//if / else if / else für die Weather codes. 
let icon = '';
let text = '';

if (data.current.weather_code === 0 || data.current.weather_code === 0) {
    icon =
        '/weather_icons/clear_sky_0.png'
    text = 'Klarer Himmel'
} else if (data.current.weather_code === 1 || data.current.weather_code === 2 || data.current.weather_code === 3) {
    icon =
        '/weather_icons/overcast_1_2_3.png'
    text = 'Wolkig'
} else if (data.current.weather_code === 45 || data.current.weather_code === 48) {
    icon =
        '/weather_icons/fog_45_48.png'
    text = 'Nebel'
} else if (data.current.weather_code === 51 || data.current.weather_code === 53 || data.current.weather_code === 55) {
    icon =
        '/weather_icons/drizzle_51_53_55.png'
    text = 'Nieselregen'
} else if (data.current.weather_code === 61 || data.current.weather_code === 63 || data.current.eather_code === 65) {
    icon =
        '/weather_icons/rain_61_63_65.png'
    text = 'Regen'
} else if (data.current.weather_code === 66 || data.current.weather_code === 67) {
    icon =
        '/weather_icons/freezing_rain_66_67.png'
    text = 'Eisregen'
} else if (data.current.weather_code === 71 || data.current.weather_code === 73 || data.current.weather_code === 75) {
    icon =
        '/weather_icons/snow_71_73_75.png'
    text = 'Schnee'
} else if (data.current.weather_code === 77 || data.current.weather_code === 85 || data.current.weather_code === 86) {
    icon =
        '/weather_icons/snow_grains_77_85_86.png'
    text = 'Schneeflocken'
} else if (data.current.weather_code === 80 || data.current.weather_code === 81 || data.current.weather_code === 82) {
    icon =
        '/weather_icons/rain_showers_80_81_82.png'
    text = 'Regenschauer'
} else if (data.current.weather_code === 95 || data.current.weather_code === 96 || data.current.weather_code === 99) {
    icon =
        '/weather_icons/thunderstorm_95_96_99.png'
    text = 'Gewitter'
} else if (data.current.weather_code === 56 || data.current.weather_code === 57) {
    icon =
        '/weather_icons/freezing_drizzle_56_57.png'
    text = 'Kalter Nieselregen'
} else if (data.current.weather_code === 85 || data.current.weather_code === 86) {
    icon =
        '/weather_icons/snow_showers_85_86.png'
    text = 'Schneeschauer'
}

// const regen = document.querySelector('.rain_mm');
// if (regen) {
//     regen.innerText = `${data.current.precipitation} mm`;
// }

// weather_container.innerHTML('.weather') += `
//     <img src="${icon}" width="100">
//      <p>${text}<p>`;
// Neuen Container für Wettercode erstellen
const weatherItem = document.createElement('div');
weatherItem.classList.add('weather_item');

// Text (h2) hinzufügen
const weatherText = document.createElement('h2');
weatherText.innerText = text;

// Icon (img) hinzufügen
const weatherImg = document.createElement('img');
weatherImg.src = icon;
weatherImg.alt = text;
weatherImg.width = 100;

// Elemente einfügen
weatherItem.appendChild(weatherText);
weatherItem.appendChild(weatherImg);

// In den Container einfügen
weather_container.appendChild(weatherItem);


// const weatherIconElement = document.querySelector('.weather_icon');
// if (weatherIconElement) {
//     weatherIconElement.src = icon;
//     weatherIconElement.alt = text;
// }

// algorithmus für die Räume
let wind_speed = data.current.wind_speed_10m;
let temperature = data.current.temperature_2m;
let rain = data.current.precipitation;

// Ermittelt die aktuelle Uhrzeit als Ganze Zahl. Es geht von 0 bis 23.
// das bedeutet auch, wenn ein Raum in der liste hour_max 17 hat, dass es bis 17.59 angezeigt wird.
// konsequenterweise, müssen wir also die schliesszeit und öffnungszeit immer eine Stunde Vor verlegen 
const currentHour = new Date().getHours();

const options = [
    {
        name: 'cafete',
        hour_min: 23,
        hour_max: 4,
        temperature_min: false,
        temperature_max: 25,
        rain_max: false,
        image: '/raum_fotos/cafete.png',
    },
    {
        name: 'Queer feministischer Raum',
        hour_min: 14,
        hour_max: 4,
        temperature_min: false,
        temperature_max: 30,
        rain_max: false,
        image: '/raum_fotos/qfr.png',
    },
    {
        name: 'Druckerei Reitschule',
        hour_min: 10,
        hour_max: 17,
        temperature_min: false,
        temperature_max: false,
        rain_max: false,
        image: '/raum_fotos/druckerei.png',
    },
    {
        name: 'Infoladen Borke',
        hour_min: 17,
        hour_max: 21,
        temperature_min: false,
        temperature_max: false,
        rain_max: false,
        image: '/raum_fotos/infoladen.png',
    },
    {
        name: 'Kino in der Reitschule',
        hour_min: 16,
        hour_max: 22,
        temperature_min: false,
        temperature_max: false,
        rain_max: false,
        image: '/raum_fotos/kino.png',
    },
    {
        name: 'Tojo Theater',
        hour_min: 16,
        hour_max: 22,
        temperature_min: false,
        temperature_max: false,
        rain_max: false,
        image: '/raum_fotos/tojo.png',
    },
    {
        name: 'Restaurant Sous le Pont',
        hour_min: 11,
        hour_max: 1,
        temperature_min: false,
        temperature_max: false,
        rain_max: false,
        image: '/raum_fotos/souslepont.png',
    },
    {
        name: 'Rössli Bar',
        hour_min: 22,
        hour_max: 4,
        temperature_min: false,
        temperature_max: false,
        rain_max: false,
        image: '/raum_fotos/roessli.png',
    },
    {
        name: 'Grosse Halle',
        hour_min: 11,
        hour_max: 1,
        temperature_min: false,
        temperature_max: false,
        rain_max: false,
        image: '/raum_fotos/grossehalle.png',
    },
    {
        name: 'Innenhof',
        hour_min: 11,
        hour_max: 1,
        temperature_min: 15,
        temperature_max: false,
        rain_max: 0,
        image: '/raum_fotos/innenhof.png',
    },
    {
        name: 'Vorplatz',
        hour_min: false,
        hour_max: false,
        temperature_min: 15,
        temperature_max: false,
        rain_max: 0,
        image: '/raum_fotos/vorplatz.jpg',
    },
    {
        name: 'Skate Bowl',
        hour_min: false,
        hour_max: false,
        temperature_min: 15,
        temperature_max: false,
        rain_max: false,
        image: '/raum_fotos/skatebowl.png',
    },
    {
        name: 'Durchgang',
        hour_min: 11,
        hour_max: 1,
        temperature_min: 15,
        temperature_max: false,
        rain_max: false,
        image: '/raum_fotos/durchgang.png',
    },
    {
        name: 'Gelateria Eisbrecher',
        hour_min: 17,
        hour_max: 22,
        temperature_min: 20,
        temperature_max: false,
        rain_max: 0,
        image: '/raum_fotos/eisbrecher.png',
    },
    {
        name: 'Dachstock',
        hour_min: 14,
        hour_max: 5,
        temperature_min: false,
        temperature_max: 25,
        rain_max: 0,
        image: '/raum_fotos/dachstock.png',
    },
];

// checkCondition vergleicht. Wenn condition === false heisst das, dass keine bedingung gestzt wird und die antwort immer true ist.
// wenn nicht false, wird die bedingung geprüft mit dem comparator
// heisst, im sous le pont regen egal -> rain_max=false -> keine bedingung -> wird ignoriert, resp immer true
// aber auf dem Vorplatz ist regen relevant -> rain_max=0, dann wird die bedingung geprüft und muss <= 0 sein

function checkCondition(value, condition, comparator) {
    if (condition === false) return true;
    return comparator(value, condition);
}

// hier wird die Liste der möglichen Optionen gefiltert
// timeOK prüft, ob die zeit zwischen hour_min und hour_max öiegt 
// option.hour_min > option.hour_max behandelt den Spezialfall ab, wen ein Raum über Mitternacht offen hat 
const possible_options = options.filter(option => {
    const timeOk = checkCondition(currentHour, option.hour_min, (a, b) => a >= b) &&
        checkCondition(currentHour, option.hour_max, (a, b) => {
            // Sonderfall: Nachtstunden (z.B. max = 4)
            if (option.hour_min > option.hour_max) {
                return a <= b || a >= option.hour_min;
            }
            return a <= b;
        });

    const tempMinOk = checkCondition(temperature, option.temperature_min, (a, b) => a >= b);
    const tempMaxOk = checkCondition(temperature, option.temperature_max, (a, b) => a <= b);
    const rainOk = checkCondition(rain, option.rain_max, (a, b) => a <= b);

    // tempMinOk: Ist Temperatur mindestens der geforderte Mindestwert?
    // tempMaxOk: Ist Temperatur höchstens der erlaubte Maximalwert?
    // rainOk: Ist der Regenwert unterhalb des Limits (z. B. 0 mm)?

    return timeOk && tempMinOk && tempMaxOk && rainOk;
});

// mit "return timeOk && tempMinOk && tempMaxOk && rainOk;" wird ein raum nur dann behalte, wenn er alle bedingungen erfüllt"

// console.log("Mögliche Optionen bei aktuellem Wetter:");
// possible_options.forEach(option => {
//     console.log(option.name);
// });
// hier könnte die Liste aller möglichen Optionen in der Konsole ausgegeben werden

// possible_options ist die liste der möglichen räume
// possible_options.length gibt die anzahl der möglichen räume an
// wenn mindestens ein raum passt, geht der code weiter, sonst kommt die nachricht das kein raum passt (wegen "else")

if (possible_options.length > 0) {
    const randomIndex = Math.floor(Math.random() * possible_options.length);
    const selectedOption = possible_options[randomIndex];

    // Math.random() gibt eine Zahl zwischen 0 und 1 zurück (z. B. 0.732).
    // Multipliziert mit der Anzahl möglicher Optionen (possible_options.length).
    // → z. B. 0.732 × 4 = 2.928
    // Math.floor(...) rundet ab → daraus wird 2.
    // Somit bekommst du eine Zahl zwischen 0 und (Anzahl - 1) → ein gültiger Index im Array.
    // mit selectedOption wird der zufällig ausgewählte Raum aus der Liste geholt 
    // So ist zb possible_options[2] der dritte Raum in der Liste

    console.log("Zufällig ausgewählter Raum:");
    console.log(selectedOption.name);
    // hier wird der Random gewählte Raum in der Konsole angezeigt 

    // Hier haben wir einen div mit der id='result_container' im HTML gemacht, so wird es nicht nur in der Konsole sondern auch im HTML angezeigt 
    const resultContainer = document.querySelector('#result_container');
    //  resultContainer.innerHTML = `<h4>Empfohlener Raum:</h4><p>${selectedOption.name}</p>`;
    resultContainer.innerHTML = `
  <h5>Empfohlener Raum:</h5>
  <p>${selectedOption.name}</p>
  ${selectedOption.image ? `<img src="${selectedOption.image}" alt="${selectedOption.name}" width="200">` : ''}
`;

} else {
    console.log("Keine passenden Räume gefunden.");
    const resultContainer = document.querySelector('#result_container');
    resultContainer.innerHTML = `<p>Leider passt aktuell kein Raum zu den Wetterbedingungen.</p>`;
}


function scroll_to_result() {
    document.querySelector('#result_container').scrollIntoView({ behavior: 'smooth' });
}

document.querySelector('#scroll_to_result').addEventListener('click', scroll_to_result);
document.querySelector('#scroll_down').addEventListener('click', scroll_to_result);

