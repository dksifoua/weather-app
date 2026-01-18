import { type JSX } from "react"
import sunnyIcon from "@/assets/images/icon-sunny.webp"

export function WeatherInfoContainer(): JSX.Element {

    return (
        <div className="flex flex-col gap-y-5">
            <WeatherInfo/>
            <WeatherDetailsContainer/>
        </div>
    )
}

function WeatherInfo(): JSX.Element {

    return (
        <div className="h-72 bg-[url('src/assets/images/bg-today-small.svg')] bg-size-[100%] md:bg-[url('src/assets/images/bg-today-large.svg')] md:bg-cover flex flex-col gap-y-4 px-6 py-10 rounded-2xl">
            <div className="flex flex-col gap-y-3 items-center justify-center">
                <p className="text-center text-preset-4">Berlin, Germany</p>
                <p className="text-center text-preset-6">Tuesday, Aug 5, 2025</p>
            </div>
            <div className="flex flex-row gap-x-5 items-center justify-between">
                <img src={sunnyIcon} alt="Sunny Icon" className="w-30 h-auto"/>
                <p className="text-center text-preset-1">20°</p>
            </div>
        </div>
    )
}

function WeatherDetailsContainer(): JSX.Element {

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-5 lg:gap-x-6 rounded-lg">
            <WeatherDetail label="Feels Like" value="18°"/>
            <WeatherDetail label="Humidity" value="46%"/>
            <WeatherDetail label="Wind" value="14 km/h"/>
            <WeatherDetail label="Precipitation" value="0 mm"/>
        </div>
    )
}

function WeatherDetail({ label, value }: { label: string, value: string }): JSX.Element {

    return (
        <div className="h-30 bg-amber-300-500 bg-neutral-800 p-5 flex flex-col gap-y-6 rounded-lg">
            <span className="text-preset-6 text-neutral-200">{label}</span>
            <span className="text-preset-3">{value}</span>
        </div>
    )
}