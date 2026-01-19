import { type JSX } from "react"
import { Header } from "@/components/Header"
import { SearchContainer } from "@/components/SearchContainer"
import { WeatherInfoContainer } from "@/components/WeatherInfoContainer"
import { DailyForecastContainer } from "@/components/DailyForecastContainer"

export function App(): JSX.Element {

    return (
        <>
            <Header/>
            <p className="text-preset-2 text-center md:w-96 xl:w-183 md:m-auto">How's the sky looking today?</p>
            <main className="flex flex-col gap-y-8 xl:gap-y-12">
                <SearchContainer/>
                <div className="flex flex-col xl:flex-row gap-y-8 xl:gap-x-8">
                    <div className="xl:basis-7/10 flex flex-col gap-y-8 xl:gap-y-12">
                        <WeatherInfoContainer/>
                        <DailyForecastContainer/>
                    </div>
                </div>
            </main>
        </>
    )
}