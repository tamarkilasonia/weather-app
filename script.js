class WeatherApp {
    constructor() {
        this.apiKey = "YOUR_API_KEY"; // Replace with your OpenWeatherMap API key
        this.cityInput = document.getElementById("city");
        this.weatherInfo = document.getElementById("weatherInfo");
        this.errorMessage = document.getElementById("errorMessage");
        this.loading = document.getElementById("loading");
        this.themeToggle = document.getElementById("themeToggle");

        document.getElementById("getWeather").addEventListener("click", () => this.getWeather());
        this.themeToggle.addEventListener("click", () => this.toggleDarkMode());
    }

    async getWeather() {
        const city = this.cityInput.value.trim();
        if (!city) {
            this.showError("Please enter a city name.");
            return;
        }

        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`;

        this.loading.classList.remove("hidden");
        this.weatherInfo.classList.add("hidden");
        this.errorMessage.classList.add("hidden");

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            if (data.cod !== 200) {
                throw new Error(data.message);
            }

            this.displayWeather(data);
        } catch (error) {
            this.showError(error.message);
        } finally {
            this.loading.classList.add("hidden");
        }
    }

    
    displayWeather(data) {
        const { name, main, weather } = data;
        document.getElementById("cityName").innerText = `Weather in ${name}`;
        document.getElementById("temperature").innerText = `Temperature: ${main.temp}°C`;
        document.getElementById("humidity").innerText = `Humidity: ${main.humidity}%`;
        document.getElementById("description").innerText = `Condition: ${weather[0].description}`;

        this.weatherInfo.classList.remove("hidden");
    }
    showError(message) {
        this.errorMessage.innerText = message;
        this.errorMessage.classList.remove("hidden");
    }

    toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
        this.themeToggle.innerText = document.body.classList.contains("dark-mode") ? "☀️ Light Mode" : "🌙 Dark Mode";
    }
}

// Initialize the Weather App
document.addEventListener("DOMContentLoaded", () => new WeatherApp());
