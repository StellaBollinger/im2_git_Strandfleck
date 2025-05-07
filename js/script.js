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
const Weather_container = document.querySelector('#weather_container');
Weather_container.innerHTML = `<h2>Aktuelles Wetter</h2>
                                <p>Temperatur: ${data.current.temperature_2m}°C</p>
                                <p>Windgeschwindigkeit: ${data.current.wind_speed_10m} km/h</p>
                                <p>Niederschlag: ${data.current.precipitation} mm</p>
                                <p>Wettercode: ${data.current.weather_code}</p>`;
// OpenMeteo Loader Ende

//if / else if / else für die Weather codes. 
let icon = '';
let text = '';

if (data.current.weather_code === 0 || data.current.weather_code === 0) {
    icon =
    '/Weather_Code_svg/Clear_sky_0.svg'
    text = 'Klarer Himmel'
    } else if (data.current.weather_code === 1 || data.current.weather_code === 2 || data.current.weather_code === 3) {
    icon =
    '/Weather_Code_svg/overcast_1_2_3.svg'
    text = 'Wolkig'
} else if (data.current.weather_code === 45 || data.current.weather_code === 48) {
    icon = 
    '/Weather_Code_svg/Fog_45_48.svg'
    text = 'Nebel'
} else if (data.current.weather_code === 51 || data.current.weather_code === 53 || data.current.weather_code === 55) {
    icon = 
    '/Weather_Code_svg/Drizzle_51_53_55.svg'
    text = 'Nieselregen'
} else if (data.current.weather_code === 61 || data.current.weather_code === 63 || wdata.current.eather_code === 65) {
    icon = 
    '/Weather_Code_svg/Rain_61_63_65.svg'
    text = 'Regen'
} else if (data.current.weather_code === 66 || data.current.weather_code === 67) {
    icon = 
    '/Weather_Code_svg/Freezing_rain_66_67.svg'
    text = 'Eisregen'
} else if (data.current.weather_code === 71 || data.current.weather_code === 73 || data.current.weather_code === 75) {
    icon = 
    '/Weather_Code_svg/Snow_71_73_75.svg'
    text = 'Schnee'
} else if (data.current.weather_code === 77 || data.current.weather_code === 85 || data.current.weather_code === 86) {
    icon =
    '/Weather_Code_svg/Snow_grains_77_85_86.svg'
    text = 'Schneeflocken'
} else if (data.current.weather_code === 80 || data.current.weather_code === 81 || data.current.weather_code === 82) {
    icon =
    '/Weather_Code_svg/Rain_showers_80_81_82.svg'
    text = 'Regenschauer'
} else if (data.current.weather_code === 95 || data.current.weather_code === 96 || data.current.weather_code === 99) {
    icon =
    '/Weather_Code_svg/Thunderstorm_95_96_99.svg'
    text = 'Gewitter'
} else if (data.current.weather_code === 56 || data.current.weather_code === 57) {
icon = 
    '/Weather_Code_svg/freezing_drizzle_56_57.svg'
    text = 'Kalter Nieselregen'
} else if (data.current.weather_code === 85 || data.current.weather_code === 86) {
    icon = 
    '/Weather_Code_svg/Snow_showers_85_86.svg'
    text = 'Schneeschauer'
}

Weather_container.innerHTML += `
    <img src="${icon}" alt="${text}" width="100">
    <p>${text}</p>`;

    
// algorithmus für die Räume
let wind_speed = data.current.wind_speed_10m;
let temperature = data.current.temperature_2m;
let rain = data.current.precipitation;

// Ermittelt die aktuelle Uhrzeit als Ganze Zahl. Es geht von 0 bis 23.
// das bedeutet auch, wenn ein Raum in der liste hour_max 17 hat, dass es bis 17.59 angezeigt wird.
// konsequenterweise, müssen wir also die schliesszeit und öffnungszeit immer eine Stunde Vor verlegen 
const currentHour = new Date().getHours();

const options = [
    { name: 'cafete',
        hour_min: 23,
        hour_max: 4,
        temperature_min: false,
        temperature_max: 25,
        rain_max: false
    },
    { name: 'Queer feministischer Raum',
        hour_min: 14,
        hour_max: 4,
        temperature_min: false,
        temperature_max: 30,
        rain_max: false
    },
    { name: 'Druckerei Reitschule',
        hour_min: 10,
        hour_max: 17,
        temperature_min: false,
        temperature_max: false,
        rain_max: false
    },
    { name: 'Infoladen Borke',
        hour_min: 17,
        hour_max: 21,
        temperature_min: false,
        temperature_max: false,
        rain_max: false
    },
    { name: 'Kino in der Reitschule',
        hour_min: 16,
        hour_max: 22,
        temperature_min: false,
        temperature_max: false,
        rain_max: false
    },
    { name: 'Tojo Theater',
        hour_min: 16,
        hour_max: 22,
        temperature_min: false,
        temperature_max: false,
        rain_max: false
    },
    { name: 'Restaurant Sous le Pont',
        hour_min: 11,
        hour_max: 1,
        temperature_min: false,
        temperature_max: false,
        rain_max: false
    },
    { name: 'Rössli Bar',
        hour_min: 22,
        hour_max: 4,
        temperature_min: false,
        temperature_max: false,
        rain_max: false
    },
    { name: 'Grosse Halle',
        hour_min: 11,
        hour_max: 1,
        temperature_min: false,
        temperature_max: false,
        rain_max: false
    },
    { name: 'Innenhof',
        hour_min: 11,
        hour_max: 1,
        temperature_min: 15,
        temperature_max: false,
        rain_max: 0
    },
    { name: 'Vorplatz',
        hour_min: false,
        hour_max: false,
        temperature_min: 15,
        temperature_max: false,
        rain_max: 0
    },
    { name: 'Skate Bowl',
        hour_min: false,
        hour_max: false,
        temperature_min: 15,
        temperature_max: false,
        rain_max: false
    },
    { name: 'Durchgang',
        hour_min: 11,
        hour_max: 1,
        temperature_min: 15,
        temperature_max: false,
        rain_max: false
    },
    { name: 'Gelateria Eisbrecher',
        hour_min: 17,
        hour_max: 22,
        temperature_min: 20,
        temperature_max: false,
        rain_max: 0
    },
    { name: 'Dachstock',
        hour_min: 14,
        hour_max: 5,
        temperature_min: false,
        temperature_max: 25,
        rain_max: 0
    },
];

// checkCondition vergleicht. Wenn condition === false heisst das, dass keine bedingung gestzt wird und die antwort immer true ist.
//  wenn nicht false, wird die bedingung geprüft mit dem comparator
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

console.log("Mögliche Optionen bei aktuellem Wetter:");
possible_options.forEach(option => {
    console.log(option.name);
});
// hier wird die Liste der möglichen Optionen angezeigt
