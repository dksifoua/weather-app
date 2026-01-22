# Weather App
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

## Run the application

I used Bun (v1.3.6) to build this application, and I suggest to it to run it. If you don't have Bun installed, you can download it from [here](https://bun.sh/).

- **By serving the original source code (unbundled):**

```bash
git clone https://github.com/dksifoua/weather-app.git
cd weather-app
bun install
bun run dev
```

- **by serving the production version:**

```bash
git clone https://github.com/dksifoua/weather-app.git
cd weather-app
bun install
bun run build
bun run preview
```

## Tech Stack

- **Frontend Core:** [React](https://react.dev/) 19 with [TypeScript](https://www.typescriptlang.org/) for type-safe development.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) 4.1 for a modern, utility-first UI design.
- **State Management:** [Zustand](https://zustand-demo.pmnd.rs/) for global state management.
- **Data Management:** [Zod](https://zod.dev/) for schema-driven API validation and the native Fetch API for network requests.
- **Build Tooling:** [Vite](https://vitejs.dev/) for an optimized development environment and fast bundling.
- **CI/CD & Infrastructure:** [GitHub Actions](https://github.com/features/actions) for automated Build & Deploy pipelines, hosted on [GitHub Pages](https://pages.github.com/).

## Author

- [@dksifoua](https://www.github.com/dksifoua)