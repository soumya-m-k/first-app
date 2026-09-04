// ================================
// 1. API KEY
// ================================

const apiKey = "YOUR API KEY";


// ================================
// 2. GET HTML ELEMENTS
// ================================

const cityInput = document.getElementById("cityInput");

const searchButton = document.getElementById("searchButton");

const cityName = document.getElementById("cityName");

const temperature = document.getElementById("temperature");

const description = document.getElementById("description");

const humidity = document.getElementById("humidity");

const windSpeed = document.getElementById("windSpeed");

const weatherIcon = document.getElementById("weatherIcon");

const errorMessage = document.getElementById("errorMessage");


// ================================
// 3. WHEN SEARCH BUTTON IS CLICKED
// ================================

searchButton.addEventListener("click", function () {

    const city = cityInput.value;

    if (city === "") {

        errorMessage.textContent = "Please enter a city name.";

        return;
    }

    getWeather(city);
});


// ================================
// 4. GET WEATHER DATA
// ================================

async function getWeather(city) {

    try {

        // OpenWeatherMap API URL

        const url =
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


        // Send request to OpenWeatherMap

        const response = await fetch(url);


        // Check if city was found

        if (!response.ok) {

            throw new Error("City not found");

        }


        // Convert response into JavaScript object

        const data = await response.json();


        // Display weather information

        displayWeather(data);


    } catch (error) {

        errorMessage.textContent = "City not found. Please try again.";

    }

}


// ================================
// 5. DISPLAY WEATHER
// ================================

function displayWeather(data) {

    // Remove previous error

    errorMessage.textContent = "";


    // City name

    cityName.textContent = data.name;


    // Temperature

    temperature.textContent =
        Math.round(data.main.temp) + "°C";


    // Weather description

    description.textContent =
        data.weather[0].description;


    // Humidity

    humidity.textContent =
        data.main.humidity + "%";


    // Wind speed

    windSpeed.textContent =
        data.wind.speed + " m/s";


    // Weather icon

    const iconCode = data.weather[0].icon;


    weatherIcon.src =
        `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

}
