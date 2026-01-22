import type { Nullable, Result } from "@/types"
import { type Dispatch, useCallback, useContext, useEffect } from "react"
import { useFetch } from "@/hooks/fetch.hook"
import { getWeatherData } from "@/api/weather"
import type { WeatherData } from "@/api/weather/schema"
import { type WeatherAction, WeatherDispatchContext } from "@/contexts/weather.context"

type Coordinates = { latitude: number, longitude: number }

export function useWeather(): [Nullable<WeatherData>, (data: Coordinates) => void] {
    const weatherDispatch: Dispatch<WeatherAction> = useWeatherDispatcher()

    const cachedGetWeatherDataFunction = useCallback(
        (query: Coordinates, signal: AbortSignal): Promise<Result<WeatherData>> => {
            return getWeatherData(query, signal)
        }, []
    )
    const [weatherData, , , , setCoordinates] = useFetch<Coordinates, WeatherData>(cachedGetWeatherDataFunction)

    useEffect(() => {
        if (weatherData) {
            weatherDispatch({ type: "SET_DATA", payload: weatherData})
        }
    }, [weatherData])

    return [weatherData, setCoordinates]
}

export function useWeatherDispatcher(): Dispatch<WeatherAction> {
    const dispatch: Nullable<Dispatch<WeatherAction>> = useContext(WeatherDispatchContext)

    if (!dispatch) {
        throw new Error("Weather dispatch context is undefined")
    }

    return dispatch
}