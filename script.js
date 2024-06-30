document.getElementById("search-button").addEventListener("click", getWeather);

async function getWeather() {
    const location = document.getElementById("location-input").value;
    const apiKey = '8efc1ccae29649d315fa2003341f0f39'; // Replace with your OpenWeather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Error fetching the weather data. Please try again later.');
        }

        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        console.error(error);
        alert('Error fetching the weather data. Please try again later.');
    }
}

function displayWeather(data) {
    document.getElementById("location-name").textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById("weather-icon").src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    document.getElementById("temperature").textContent = `Temperature: ${data.main.temp}°C`;
    document.getElementById("description").textContent = `Description: ${data.weather[0].description}`;
    document.getElementById("humidity").textContent = `Humidity: ${data.main.humidity}%`;
    document.getElementById("wind-speed").textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const sunriseTime = new Date(data.sys.sunrise * 1000);
    const sunsetTime = new Date(data.sys.sunset * 1000);
    document.getElementById("sunrise").textContent = `Sunrise: ${sunriseTime.toLocaleTimeString()}`;
    document.getElementById("sunset").textContent = `Sunset: ${sunsetTime.toLocaleTimeString()}`;

    document.getElementById("weather-info").style.display = 'block';
}
