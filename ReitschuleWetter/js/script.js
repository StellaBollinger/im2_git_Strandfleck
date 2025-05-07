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