const form = document.getElementById("weather-form");
const locationInput = document.getElementById("location");
const weatherDisplay = document.getElementById("weather-display");
const loading = document.getElementById("loading");

const apiKey = "R36XWUAK87X9KTJBNN2CWFERK";

const getWeather = async (location) => {
    try{
        loading.classList.remove("hidden");
        const response = await fetch(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}&contentType=json`
        );
        if(!response.ok){
            throw new Error("Not found");
        }
        const data = await response.json();
        const weather = {
            location: data.resolvedAddress,
            temp: data.currentConditions.temp,
            conditions: data.currentConditions.conditions,
            humidity: data.currentConditions.humidity,
            wind: data.currentConditions.windspeed,
        };

        displayWeather(weather);
    }
    catch (error) {
        weatherDisplay.innerHTML = `<p>Error: ${error.message}</p>`;
    } finally {
        loading.classList.add("hidden");
    }
}

const displayWeather = (weather) => {
    weatherDisplay.innerHTML = `
        <h2>${weather.location}</h2>
        <p>Temperature: ${weather.temp}°C</p>
        <p>Conditions: ${weather.conditions}</p>
        <p>Humidity: ${weather.humidity}%</p>
        <p>Wind Speed: ${weather.wind} km/h</p>
    `;

    const cond = weather.conditions?.toLowerCase() || "";

    if (cond.includes("rain")) {
        document.body.style.backgroundColor = "#a3c2f7";
    } else if (cond.includes("cloud")) {
        document.body.style.backgroundColor = "#d3d3d3";
    } else if (cond.includes("clear")) {
        document.body.style.backgroundColor = "#f7e79d";
    } else {
        document.body.style.backgroundColor = "#e0f7fa";
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const location = locationInput.value.trim();
    if (location) getWeather(location);
});