document.getElementById("getWeather").addEventListener("click", getWeather);

function getWeather() {
    const city = document.getElementById("city").value;
    const apiKey = "YOUR_API_KEY"; // Replace this with your actual OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === "404") {
                alert("City not found!");
            } else {
                displayWeather(data);
            }
        })
        .catch(error => alert("Error fetching data"));
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const description = data.weather[0].description;

    // Update the UI
    document.getElementById("cityName").innerText = `Weather in ${cityName}`;
    document.getElementById("temperature").innerText = `Temperature: ${temperature}°C`;
    document.getElementById("humidity").innerText = `Humidity: ${humidity}%`;
    document.getElementById("description").innerText = `Condition: ${description}`;

    // Show weather information
    document.getElementById("weatherInfo").style.display = "block";
}
