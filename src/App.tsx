import { type JSX, useEffect } from "react"
import { Header } from "@/components/Header"
import { SearchContainer } from "@/components/SearchContainer"
import { WeatherInfoContainer } from "@/components/WeatherInfoContainer"
import { DailyForecastContainer } from "@/components/DailyForecastContainer"
import { HourlyForecastContainer } from "@/components/HourlyForecastContainer"
import { useGlobalStore } from "@/store"
import { useShallow } from "zustand/react/shallow"
import { APIError } from "@/components/APIError"
import { getNavigatorLocation } from "@/utils"

export function App(): JSX.Element {
    const { fetchWeatherData, weatherData, error } = useGlobalStore(
        useShallow((store) => ({
            fetchWeatherData: store.fetchDataFunction,
            weatherData: store.fetchedData,
            error: store.error
        }))
    )

    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal

        getNavigatorLocation()
            .then((location) => {
                fetchWeatherData(location, signal)
            })
            .catch(() => {
                // Set default location to Montreal, Canada (This is where I live)
                fetchWeatherData({ latitude: 45.5, longitude: -73.56 }, signal)
            })

        return () => abortController.abort()
    }, [fetchWeatherData])

    if (error) return (
        <>
            <Header/>
            <APIError/>
        </>
    )

    return (
        <>
            <Header/>
            <p className="text-preset-2 text-center md:w-96 xl:w-183 md:mx-auto">How's the sky looking today?</p>
            <main className="flex flex-col gap-y-8 xl:gap-y-12">
                <SearchContainer/>
                {
                    weatherData === null
                        ? <p className="text-preset-4 text-center">No search result!</p>
                        : <div className="flex flex-col xl:flex-row gap-y-8 xl:gap-x-8">
                            <div className="xl:basis-7/10 flex flex-col gap-y-8 xl:gap-y-12">
                                <WeatherInfoContainer/>
                                <DailyForecastContainer/>
                            </div>
                            <div className="xl:basis-3/10">
                                <HourlyForecastContainer/>
                            </div>
                        </div>
                }

            </main>
        </>
    )
}