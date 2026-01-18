import type { JSX } from "react";
import { WeatherInfoContainer } from "@/components/main/WeatherInfoContainer"
import { HourlyForecastContainer } from "@/components/main/HourlyForecastContainer"
import sunnyIcon from "@/assets/images/icon-sunny.webp"

export function ContentContainer(): JSX.Element {

    return (
        <div className="flex flex-col lg:flex-row gap-y-8 lg:gap-x-8">
            <div className="xl:basis-7/10 flex flex-col gap-y-8">
                <WeatherInfoContainer/>
                <DailyForecastContainer/>
            </div>
            <HourlyForecastContainer/>
        </div>
    )
}

function DailyForecastContainer(): JSX.Element {

    return (
        <div className="flex flex-col gap-y-5">
            <span className="text-preset-5">Daily Forecast</span>
            <div className="grid grid-cols-3 md:grid-cols-7 gap-4">
                <WeatherCard day="Mon"/>
                <WeatherCard day="Tue"/>
                <WeatherCard day="Wed"/>
                <WeatherCard day="Thu"/>
                <WeatherCard day="Fri"/>
                <WeatherCard day="Sat"/>
                <WeatherCard day="Sun"/>
            </div>
        </div>
    )
}

function WeatherCard({ day }: { day: string }): JSX.Element {

    return (
        <div className="h-42 flex flex-col gap-y-4 px-2.5 py-4 bg-neutral-800 rounded-lg">
            <p className="text-preset-6 text-center">{day}</p>
            <img src={sunnyIcon} alt="Sunny Icon" className="w-15 h-auto mx-auto"/>
            <div className="flex flex-row justify-between">
                <p className="text-preset-7">20°</p>
                <p className="text-preset-7 text-neutral-200">14°</p>
            </div>
        </div>
    )
}