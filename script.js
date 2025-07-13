const API_KEY = '3f8920fc7080bb847233ebfad0859154';
const baseURL = `https://api.openweathermap.org/data/2.5/weather`;
const forecastURL = `https://api.openweathermap.org/data/2.5/forecast`;

document.getElementById('getWeatherBtn').addEventListener('click', async () => {
    const city = document.getElementById('cityInput').value;
    const unit = document.getElementById('unitSelect').value;

    // Validate user input
    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    // Fetch weather data
    const weatherData = await fetchWeatherData(city, unit);
    if (weatherData) {
        displayWeatherData(weatherData);
        
        // Fetch forecast data
        const forecastData = await fetchForecastData(city, unit);
        if (forecastData) {
            displayForecastData(forecastData);
        }
    }
});

// Function to fetch current weather data
async function fetchWeatherData(city, unit) {
    try {
        const response = await fetch(`${baseURL}?q=${city}&units=${unit}&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Weather data not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        alert('Error fetching weather data: ' + error.message);
        return null;
    }
}

// Function to fetch forecast data
async function fetchForecastData(city, unit) {
    try {
        const response = await fetch(`${forecastURL}?q=${city}&units=${unit}&appid=${API_KEY}`);
        if (!response.ok) {
            throw new Error('Forecast data not found');
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching forecast data:', error);
        alert('Error fetching forecast data: ' + error.message);
        return null;
    }
}

// Function to display current weather data
function displayWeatherData(data) {
    document.getElementById('cityName').innerText = `${data.name}, ${data.sys.country}`;
    document.getElementById('temperature').innerText = `${Math.round(data.main.temp)}°`;
    document.getElementById('feelsLike').innerText = `Feels Like: ${Math.round(data.main.feels_like)}°`;
    document.getElementById('description').innerText = data.weather[0].description;
    document.getElementById('timeUpdated').innerText = `Last Updated: ${new Date(data.dt * 1000).toLocaleTimeString()}`;
    document.getElementById('windSpeed').innerText = `${data.wind.speed} m/s`;
    document.getElementById('humidity').innerText = `${data.main.humidity}%`;
    document.getElementById('pressure').innerText = `${data.main.pressure} hPa`;
    document.getElementById('noReportMessage').style.display = 'none'; // Hide any previous error messages
}

// Function to display forecast data
function displayForecastData(data) {
    const forecastList = document.getElementById('forecastList');
    forecastList.innerHTML = ''; // Clear previous forecasts

    const uniqueDates = new Set();
    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleDateString();
        if (!uniqueDates.has(date)) {
            uniqueDates.add(date);
            const forecastBox = document.createElement('div');
            forecastBox.classList.add('forecast-box');

            forecastBox.innerHTML = `
                <div class="date" style="color: orange;">${date}</div>
                <p>Temp: ${Math.round(item.main.temp)}°</p>
                <p>Feels Like: ${Math.round(item.main.feels_like)}°</p>
                <p>Condition: ${item.weather[0].description}</p>
                <p>Wind: ${item.wind.speed} m/s</p>
                <p>Humidity: ${item.main.humidity}%</p>
                <p>Pressure: ${item.main.pressure} hPa</p>
                <p>Updated: ${new Date(item.dt * 1000).toLocaleTimeString()}</p>
            `;
            forecastList.appendChild(forecastBox);
        }
    });
}

// Function to check weather for a specific date
async function checkWeatherForDate() {
    const dateInput = document.getElementById('dateInput').value;

    if (!dateInput) {
        document.getElementById('noReportMessage').style.display = 'none';
        return;
    }

    const city = document.getElementById('cityInput').value;
    const unit = document.getElementById('unitSelect').value;

    if (!city) {
        alert('Please enter a city name first.');
        return;
    }

    const timestamp = Math.floor(new Date(dateInput).getTime() / 1000);
    const weatherResponse = await fetch(`${baseURL}?q=${city}&units=${unit}&appid=${API_KEY}`);
    const weatherData = await weatherResponse.json();

    if (weatherResponse.ok) {
        const forecastResponse = await fetch(`${forecastURL}?q=${city}&units=${unit}&appid=${API_KEY}`);
        const forecastData = await forecastResponse.json();
        
        const forecastExists = forecastData.list.some(item => {
            return new Date(item.dt * 1000).toLocaleDateString() === new Date(timestamp * 1000).toLocaleDateString();
        });

        if (!forecastExists) {
            document.getElementById('noReportMessage').style.display = 'block';
        } else {
            document.getElementById('noReportMessage').style.display = 'none';
        }
    } else {
        document.getElementById('noReportMessage').style.display = 'block';
    }
}

// Event listener for the date input change
document.getElementById('dateInput').addEventListener('change', checkWeatherForDate);