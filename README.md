# Weather App
[![Build](https://github.com/dksifoua/weather-app/actions/workflows/build.yaml/badge.svg)](https://github.com/dksifoua/weather-app/actions/workflows/build.yaml)
[![Deployment](https://github.com/dksifoua/weather-app/actions/workflows/deployment.yaml/badge.svg)](https://github.com/dksifoua/weather-app/actions/workflows/deployment.yaml)
![GitHub package.json version](https://img.shields.io/github/package-json/v/dksifoua/weather-app)
![GitHub repo size](https://img.shields.io/github/repo-size/dksifoua/weather-app)
![GitHub License](https://img.shields.io/github/license/dksifoua/weather-app)
![GitHub top language](https://img.shields.io/github/languages/top/dksifoua/weather-app)
![GitHub commit activity](https://img.shields.io/github/commit-activity/t/dksifoua/weather-app)
![GitHub Repo stars](https://img.shields.io/github/stars/dksifoua/weather-app)

Responsive weather app with search functionality, unit conversion, and detailed forecasts using the Open-Meteo API.

## Features

- Search for weather information by entering a location in the search bar
- View current weather conditions, including temperature, weather icon, and location details
- See additional weather metrics like "feels like" temperature, humidity percentage, wind speed, and precipitation amounts
- Browse a 7-day weather forecast with daily high/low temperatures and weather icons
- View an hourly forecast showing temperature changes throughout the day
- Switch between different days of the week using the day selector in the hourly forecast section
- Toggle between Imperial and Metric measurement units via the units dropdown
- Switch between specific temperature units (Celsius and Fahrenheit) and measurement units for wind speed (km/h and mph) and precipitation (millimeters) via the units dropdown
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

## Setup

- **Dev environment setup:**

```bash
git clone https://github.com/dksifoua/weather-app.git
cd weather-app
bun install
bun run dev
```

- **Production build and deployment:**

```bash
git clone https://github.com/dksifoua/weather-app.git
cd weather-app
bun install
bun run build
bun run preview
```


## Tech Stack

- Typescript
- React 19 (Hook + Context) + Vite
- Tailwind CSS
- Fetch (api integration) + Zod (data validation)
- Netlify


## Authors

- [@dksifoua](https://www.github.com/dksifoua)