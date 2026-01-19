import { type JSX } from "react"
import SunnyIcon from "@/assets/images/icon-sunny.webp"

export function DailyForecastContainer(): JSX.Element {

    return (
        <div className="flex flex-col gap-y-5">
            <p className="text-preset-5">Daily Forecast</p>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
                <WeatherCard/>
                <WeatherCard/>
                <WeatherCard/>
                <WeatherCard/>
                <WeatherCard/>
                <WeatherCard/>
                <WeatherCard/>
            </div>
        </div>
    )
}

function WeatherCard(): JSX.Element {

    return (
        <div className="h-41.25 flex flex-col gap-y-4 px-2.5 py-4 rounded-12 bg-neutral-800 border border-neutral-600 items-center">
            <p className="text-preset-6">Tue</p>
            <img src={SunnyIcon} alt="Sunny Icon" className="w-15 h-15"/>
            <div className="w-full flex flex-row justify-between">
                <p className="text-preset-7">20°</p>
                <p className="text-preset-7">14°</p>
            </div>
        </div>
    )
}