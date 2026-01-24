import type { Coordinates, MeasureType, Nullable, UnitFor, Units, UnitSystem } from "@/types"

import DrizzleIcon from "@/assets/images/icon-drizzle.webp"
import FogIcon from "@/assets/images/icon-fog.webp"
import OvercastIcon from "@/assets/images/icon-overcast.webp"
import PartlyCloudyIcon from "@/assets/images/icon-partly-cloudy.webp"
import RainIcon from "@/assets/images/icon-rain.webp"
import SnowIcon from "@/assets/images/icon-snow.webp"
import StormIcon from "@/assets/images/icon-storm.webp"
import SunnyIcon from "@/assets/images/icon-sunny.webp"
import type { WeatherData } from "@/api/weather/schema"

export function getUnitSystem(units: Units, defaultUnitSystem: UnitSystem): UnitSystem {
    if (units.temperature === "celsius" && units.windspeed === "km/h" && units.precipitation === "mm") {
        return "metric"
    }

    if (units.temperature === "fahrenheit" && units.windspeed === "mph" && units.precipitation === "in") {
        return "imperial"
    }

    return defaultUnitSystem
}

export function getUnitsFor(unitSystem: UnitSystem): Units {
    return unitSystem === "metric"
        ? { temperature: "celsius", windspeed: "km/h", precipitation: "mm" }
        : { temperature: "fahrenheit", windspeed: "mph", precipitation: "in" }
}

export function convertWeatherData({ from, data, to }: { from: Units, data: Nullable<WeatherData>, to: Units }): Nullable<WeatherData> {
    if (data === null) {
        return null
    }

    return {
        ...data,
        infos: {
            current: {
                date: data.infos.current.date,
                weather_code: data.infos.current.weather_code,
                temperature: convertMeasure(from.temperature, data.infos.current.temperature, to.temperature),
                feel_like: convertMeasure(from.temperature, data.infos.current.feel_like, to.temperature),
                humidity: data.infos.current.humidity,
                wind_speed: convertMeasure(from.windspeed, data.infos.current.wind_speed, to.windspeed),
                precipitation: convertMeasure(from.precipitation, data.infos.current.precipitation, to.precipitation),
            },
            forecast: {
                daily: data.infos.forecast.daily.map((forecast) => ({
                    date: forecast.date,
                    weather_code: forecast.weather_code,
                    temperature_min: convertMeasure(from.temperature, forecast.temperature_min, to.temperature),
                    temperature_max: convertMeasure(from.temperature, forecast.temperature_max, to.temperature),
                })),
                hourly: data.infos.forecast.hourly.map((forecast) => ({
                    datetime: forecast.datetime,
                    weather_code: forecast.weather_code,
                    temperature: convertMeasure(from.temperature, forecast.temperature, to.temperature),
                })),
            }
        },
    }
}

export function convertMeasure<T extends MeasureType>(from: UnitFor<T>, value: number, to: UnitFor<T>): number {
    if (from === to) return value

    // Temperature conversions
    if (from === "celsius" && to === "fahrenheit") {
        return (value * 9 / 5) + 32
    }
    if (from === "fahrenheit" && to === "celsius") {
        return (value - 32) * 5 / 9
    }

    // Windspeed conversions
    if (from === "km/h" && to === "mph") {
        return value * 0.621371
    }
    if (from === "mph" && to === "km/h") {
        return value * 1.60934
    }

    // Precipitation conversions
    if (from === "mm" && to === "in") {
        return value * 0.0393701
    }
    if (from === "in" && to === "mm") {
        return value * 25.4
    }

    return value
}

/**
 * WMO Weather interpretation codes (WW)
 *   0: Clear sky
 *   1, 2, 3: Mainly clear, partly cloudy, and overcast
 *   45, 48: Fog and depositing rime fog
 *   51, 53, 55: Drizzle: Light, moderate, and dense intensity
 *   56, 57: Freezing Drizzle: Light and dense intensity
 *   61, 63, 65: Rain: Slight, moderate and heavy intensity
 *   66, 67: Freezing Rain: Light and heavy intensity
 *   71, 73, 75: Snow fall: Slight, moderate, and heavy intensity
 *   77: Snow grains
 *   80, 81, 82: Rain showers: Slight, moderate, and violent
 *   85, 86: Snow showers slight and heavy
 *   95: Thunderstorm: Slight or moderate
 *   96, 99: Thunderstorm with slight and heavy hail
 * @param code
 */
export function getIcon(code: number): string {
    switch (true) {
        case code === 0:
            return SunnyIcon
        case [1, 2, 3].includes(code):
            return PartlyCloudyIcon
        case code === 3:
            return OvercastIcon
        case [45, 48].includes(code):
            return FogIcon
        case [51, 53, 55, 56, 57].includes(code):
            return DrizzleIcon
        case [61, 63, 65, 66, 67].includes(code):
            return RainIcon
        case [71, 73, 75, 77].includes(code):
            return SnowIcon
        case [80, 81, 82].includes(code):
            return RainIcon
        case [85, 86].includes(code):
            return SnowIcon
        case [95, 96, 99].includes(code):
            return StormIcon
        default:
            return SunnyIcon;
    }
}

export function getNavigatorLocation(): Promise<Coordinates> {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error("Not Supported"))
            return
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => resolve({ latitude: position.coords.latitude, longitude: position.coords.longitude }),
            (error) => reject(error),
        );
    });
}