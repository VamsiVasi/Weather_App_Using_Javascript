// Select HTML elements and store them in separate variables
const iconElement = document.querySelector(".weather-icon");
const locationIcon = document.querySelector(".location-icon");
const tempElement = document.querySelector(".temperature-value p");
const descElement = document.querySelector(".temperature-description p");
const locationElement = document.querySelector(".location p");
const notificationElement = document.querySelector(".notifications");

// Get the input field
let input = document.getElementById("search");
let city = "";
let latitude = 0.0;
let longitude = 0.0;

// Execute getSearchLocationWeather(city) function when the user enters the city clicks "Enter" on the keyboard
input.addEventListener("keyup", (event) => {
    
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
        event.preventDefault();
        city = input.value;
        getSearchLocationWeather(city);
        console.log(city);
        input.value = '';
    }
});

// Weather data
const weather = {};

weather.temperature = {
    unit: "celsius"
};

const KELVIN = 273;

// API Key of OpenWeatherMap
const key = '002878ce68538d02d9ea17433c3715c5';

// Checks if the Browser supports Geolocation
if ('geolocation' in navigator) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
}
else {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = '<p> Browser doesnot support geolocation </p>'
}

// Sets User's Position
function setPosition(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    getCurrentLocationWeather(latitude, longitude);
}

locationIcon.addEventListener('click', () => {
    input.value = '';
    getCurrentLocationWeather(latitude, longitude);
});

// Shows error when there is an issue with Geolocation Service
function showError(error) {
    notificationElement.style.display = 'block';
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

// Get search location weather given by the user input from API Provider
function getSearchLocationWeather(city) {
    let api = `https://api.openweathermap.org/data/2.5/weather/?q=${city}&appid=${key}`;
    fetch(api).then(res => {
        let data = res.json();
        return data;
    }).then(data => {
        console.log(data)
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].id;
        weather.icon = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then(() => {
        displayWeather()
    })
}

// Get current location weather of the user from API Provider
function getCurrentLocationWeather(latitude, longitude) {
    let api = `https://api.openweathermap.org/data/2.5/weather/?lat=${latitude}&lon=${longitude}&appid=${key}`;
    fetch(api).then(res => {
        let data = res.json();
        return data;
    }).then((data) => {
        console.log(data)
        weather.temperature.value = Math.floor(data.main.temp - KELVIN);
        weather.description = data.weather[0].description;
        weather.iconId = data.weather[0].id;
        weather.icon = data.weather[0].icon;
        weather.city = data.name;
        weather.country = data.sys.country;
    }).then(() => {
        displayWeather()
    })
}

// Display Weather to UI
function displayWeather() {
    let weatherIcon = weather.iconId;

    // Weather Icons :-

    // Clear Sky
    if (weather.iconId === 800) {
        weatherIcon = weather.icon;
    }

    // Few Clouds
    else if (weather.iconId === 801) {
        weatherIcon = weather.icon;
    }

    // Broken Clouds
    else if (weather.iconId === 803) {
        if (weather.icon === '04d') {
            weatherIcon = 'broken-cloud-day';
        }
        else {
            weatherIcon = 'broken-cloud-night';
        }
    }

    // OverCast Clouds
    else if (weather.iconId === 804) {
        weatherIcon = weather.icon;
    }

    // Smoke
    else if (weather.iconId === 711) {
        if (weather.icon === '50d') {
            weatherIcon = 'smoke-day';
        }
        else {
            weatherIcon = 'smoke-night';
        }
    }

    // Haze
    else if (weather.iconId === 721) {
        weatherIcon = weather.icon;
    }

    // Sand/Dust Whirls || Dust
    else if (weather.iconId === 731 || weather.iconId === 761) {
        if (weather.icon === '50d') {
            weatherIcon = 'dust-day';
        }
        else {
            weatherIcon = 'dust-night';
        }
    }

    // Fog
    else if (weather.iconId === 741) {
        if (weather.icon === '50d') {
            weatherIcon = 'fog-day';
        }
        else {
            weatherIcon = 'fog-night';
        }
    }

    // Sand
    else if (weather.iconId === 751) {
        if (weather.icon === '50d') {
            weatherIcon = 'sand-day';
        }
        else {
            weatherIcon = 'sand-night';
        }
    }

    // Light Snow
    else if (weather.iconId === 600) {
        if (weather.icon === '13d') {
            weatherIcon = 'snow-little-day';
        }
        else {
            weatherIcon = 'snow-little-night';
        }
    }

    // Snow
    else if (weather.iconId === 601) {
        if (weather.icon === '13d') {
            weatherIcon = 'snow-day';
        }
        else {
            weatherIcon = 'snow-night';
        }
    }

    // Heavy Snow
    else if (weather.iconId === 602) {
        if (weather.icon === '13d') {
            weatherIcon = 'snow-heavy-day';
        }
        else {
            weatherIcon = 'snow-heavy-night';
        }
    }

    // Sleet
    else if (weather.iconId === 611) {
        weatherIcon = 'sleet';
    }

    // Light Shower Sleet || Light Rain and Snow
    else if (weather.iconId === 612 || weather.iconId === 615) {
        if (weather.icon === '13d') {
            weatherIcon = 'sleet-little-day';
        }
        else {
            weatherIcon = 'sleet-little-night';
        }
    }

    // Shower Sleet
    else if (weather.iconId === 613) {
        if (weather.icon === '13d') {
            weatherIcon = 'sleet-shower-day';
        }
        else {
            weatherIcon = 'sleet-shower-night';
        }
    }

    // Rain and Snow || Freezing Rain
    else if (weather.iconId === 616 || weather.iconId === 511) {
        if (weather.icon === '13d') {
            weatherIcon = 'rain-snow-day';
        }
        else {
            weatherIcon = 'rain-snow-night';
        }
    }

    // Light Shower Snow
    else if (weather.iconId === 620) {
        if (weather.icon === '13d') {
            weatherIcon = 'snow-shower-little-day';
        }
        else {
            weatherIcon = 'snow-shower-little-night';
        }
    }

    // Shower Snow
    else if (weather.iconId === 621) {
        if (weather.icon === '13d') {
            weatherIcon = 'snow-shower-day';
        }
        else {
            weatherIcon = 'snow-shower-night';
        }
    }

    // Heavy Shower Snow
    else if (weather.iconId === 622) {
        if (weather.icon === '13d') {
            weatherIcon = 'snow-shower-heavy-day';
        }
        else {
            weatherIcon = 'snow-shower-heavy-night';
        }
    }

    // Light Rain || Drizzle Rain
    else if (weather.iconId === 500 || weather.iconId === 311) {
        if (weather.icon === '10d' || weather.icon === '09d') {
            weatherIcon = 'rain-little-day';
        }
        else if (weather.icon === '10n' || weather.icon === '09n') {
            weatherIcon = 'rain-little-night';
        }
    }

    // Moderate Rain || Light Intensity Drizzle Rain
    else if (weather.iconId === 501 || weather.iconId === 310) {
        if (weather.icon === '10d' || weather.icon === '09d') {
            weatherIcon = 'rain-mod-day';
        }
        else if (weather.icon === '10n' || weather.icon === '09n') {
            weatherIcon = 'rain-mod-night';
        }
    }

    // Heavy Intensity Rain || Very Heavy Rain || Extreme Rain || Light Intensity Drizzle Rain
    else if (weather.iconId === 502 || weather.iconId === 503 || weather.iconId === 504 || weather.iconId === 312) {
        if (weather.icon === '10d' || weather.icon === '09d') {
            weatherIcon = 'rain-heavy-day';
        }
        else if (weather.icon === '10n' || weather.icon === '09n') {
            weatherIcon = 'rain-heavy-night';
        }
    }

    // Light Intensity Shower Rain || Shower Rain and Drizzle || Thunderstorm with Light Rain || Thunderstorm with Light Drizzle
    else if (weather.iconId === 520 || weather.iconId === 313 || weather.iconId === 200 || weather.iconId === 230) {
        if (weather.icon === '09d' || weather.icon === '11d') {
            weatherIcon = 'rain-shower-little-day';
        }
        else if (weather.icon === '09d' || weather.icon === '11d') {
            weatherIcon = 'rain-shower-little-night';
        }
    }

    // Shower Rain || Shower Drizzle || Thunderstorm with Rain || Thunderstorm with Drizzle
    else if (weather.iconId === 521 || weather.iconId === 321 || weather.iconId === 201 || weather.iconId === 231) {
        if (weather.icon === '09d' || weather.icon === '11d') {
            weatherIcon = 'rain-shower-day';
        }
        else if (weather.icon === '09d' || weather.icon === '11d') {
            weatherIcon = 'rain-shower-night';
        }
    }

    // Heavy Intensity Shower Rain || Ragged Shower Rain || Heavy Shower Rain and Drizzle || Thunderstorm with Heavy Rain || Thunderstorm with Heavy Drizzle
    else if (weather.iconId === 522 || weather.iconId === 531 || weather.iconId === 314 || weather.iconId === 202 || weather.iconId === 232) {
        if (weather.icon === '09d' || weather.icon === '11d') {
            weatherIcon = 'rain-shower-heavy-day';
        }
        else if (weather.icon === '09d' || weather.icon === '11d') {
            weatherIcon = 'rain-shower-heavy-night';
        }
    }

    // Light Intensity Drizzle
    else if (weather.iconId === 300) {
        if (weather.icon === '09d') {
            weatherIcon = 'drizzle-little-day';
        }
        else {
            weatherIcon = 'drizzle-little-night';
        }
    }

    // Drizzle
    else if (weather.iconId === 301) {
        if (weather.icon === '09d') {
            weatherIcon = 'drizzle-day';
        }
        else {
            weatherIcon = 'drizzle-night';
        }
    }

    // Heavy Intensity Drizzle
    else if (weather.iconId === 302) {
        if (weather.icon === '09d') {
            weatherIcon = 'drizzle-heavy-day';
        }
        else {
            weatherIcon = 'drizzle-heavy-night';
        }
    }

    // Light Thunderstorm
    else if (weather.iconId === 210) {
        if (weather.icon === '11d') {
            weatherIcon = 'thunderstorms-little-day';
        }
        else {
            weatherIcon = 'thunderstorms-little-night';
        }
    }

    // Thunderstorm
    else if (weather.iconId === 211) {
        if (weather.icon === '11d') {
            weatherIcon = 'thunderstorms-day';
        }
        else {
            weatherIcon = 'thunderstorms-night';
        }
    }

    // Heavy Thunderstorm || Ragged Thunderstorm
    else if (weather.iconId === 212 || weather.iconId === 221) {
        if (weather.icon === '11d') {
            weatherIcon = 'thunderstorms-heavy-day';
        }
        else {
            weatherIcon = 'thunderstorms-heavy-night';
        }
    }

    iconElement.innerHTML = `<img src="Icons/${weatherIcon}.svg"/>`;
    tempElement.innerHTML = `${weather.temperature.value}°<span>C</span>`;
    descElement.innerHTML = weather.description;
    locationElement.innerHTML = `${weather.city}, ${weather.country}`;
}
