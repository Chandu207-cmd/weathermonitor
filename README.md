🌦️ Weather Monitoring App
🚀 Overview
This is a web application for monitoring the current weather and a 7-day forecast for any city. It uses the OpenWeather API to fetch real-time weather data and forecast data.

🗂️ Files and Structure
1️⃣ HTML (index.html)
Sets up the structure of the app.

Includes:

Navbar with external links (Home, Contact, News, etc.).

Header image section ("Weather Monitoring" title over a background image).

A marquee for welcome message.

Input fields to enter a city and select units (Celsius or Fahrenheit).

Displays:

City name

Temperature

Feels like

Description

Last updated time

Wind speed, Humidity, Pressure

Forecast section that shows 5–7 day forecast boxes.

2️⃣ CSS (styles.css)
💡 Global styles
Sets background image and fonts.

Styles the header and navbar with dark background and white links.

Adds hover effects to navbar links.

💡 Image taskbar
Styles the main banner image.

Places overlay text centered with large white text and shadow.

💡 Present weather box
White semi-transparent box with orange shadow.

Rounded corners and padding for a card-like look.

Styles city name, temperature, description, feels like, and other info as small boxes with gray background and white text.

💡 Forecast boxes
Forecast boxes have:

Equal fixed width and height (width: 150px; height: 300px;).

White semi-transparent background with border and rounded corners.

Date box with orange background and white text.

Uses flex container (forecast-box-container) for scrolling and equal spacing.

💡 Report section
Simple card with red border and gray background for reporting issues.

3️⃣ JavaScript (script.js)
💡 Fetch current weather
Uses city input and unit selection to query OpenWeather API.

Displays current weather details in corresponding boxes.

💡 Fetch 5–7 day forecast
Fetches forecast data (every 3 hours) and selects one entry per day.

Creates forecast boxes dynamically, including:

Date box in orange with white text.

Temperature, feels like, weather condition, wind, humidity, pressure, and update time.

💡 Error handling
Alerts user when no city is entered.

Alerts on fetch errors or if no forecast available for a selected date.

💬 How the styles make forecast boxes equal
In CSS:


.forecast-box {
    width: 150px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid grey;
    border-radius: 8px;
    padding: 10px;
    margin: 5px;
    text-align: center;
}
width and height ensure equal size for all boxes, regardless of content.

Fixed date styling using:


.date {
    background-color: orange;
    color: white !important;
    padding: 6px;
    border-radius: 5px;
    display: inline-block;
    font-weight: bold;
}

✅ Features summary
✅ Live current weather for any city.

✅ 5–7 day forecast with separate boxes and consistent style.

✅ Choice of units (°C or °F).

✅ Error handling for missing data.

✅ "Last updated" styled as a box with same style as other data.

✅ Beautiful and responsive design with background images.

💡 Improvements or Next Steps
Add icons for weather condition (e.g., sun, cloud, rain).

Add loader/spinner while fetching data.

Add animations or transitions to forecast boxes.

Support for multiple languages.

⚡ Final Note
You can copy and use this README or place it at the top of your CSS and JS files as comments to help understand and maintain the project better.



