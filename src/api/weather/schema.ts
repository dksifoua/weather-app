import { z } from "zod"

export const WeatherDataApiResponseSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
    timezone: z.string(),
    current: z.object({
        time: z.string(),
        temperature_2m: z.number(),
        weather_code: z.number(),
    }),
    hourly: z.object({
        time: z.array(z.string()),
        temperature_2m: z.array(z.number()),
        weather_code: z.array(z.number()),
    }),
    daily: z.object({
        time: z.array(z.string()),
        weather_code: z.array(z.number()),
        temperature_2m_max: z.array(z.number()),
        temperature_2m_min: z.array(z.number()),
    })
})

export const WeatherDataSchema = WeatherDataApiResponseSchema.transform((data) => {
    const { daily, hourly } = data

    const dailyForecast = []
    for (const [index, time] of daily.time.entries()) {
        dailyForecast.push({
            time: new Date(time),
            weather_code: daily.weather_code[index],
            temperature_max: daily.temperature_2m_max[index],
            temperature_min: daily.temperature_2m_min[index],
        })
    }

    const hourlyForecast = []
    for (const [index, time] of hourly.time.entries()) {
        hourlyForecast.push({
            time: new Date(time),
            weather_code: hourly.weather_code[index],
            temperature: hourly.temperature_2m[index],
        })
    }

    return {
        latitude: data.latitude,
        longitude: data.longitude,
        timezone: data.timezone,
        infos: {
            current: {
                time: new Date(data.current.time),
                temperature: data.current.temperature_2m,
                weather_code: data.current.weather_code,
            },
            forecast: {
                daily: dailyForecast,
                hourly: hourlyForecast
            }
        }
    }
})

export type WeatherData = z.infer<typeof WeatherDataSchema>