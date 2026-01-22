import { type JSX } from "react"
import SunnyIcon from "@/assets/images/icon-sunny.webp"
import type { MeasureType, Nullable } from "@/types"
import { useGlobalStore } from "@/store"

export function WeatherInfoContainer(): JSX.Element {

    return (
        <div className="flex flex-col gap-y-5 xl:gap-y-8">
            <WeatherInfo location="Berlin, Germany" date={new Date()} temperature={20}/>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-5 xl:gap-x-6">
                <WeatherDetail measureType="temperature" label="Feels Like" value={18}/>
                <WeatherDetail measureType={null} label="Humidity" value={48}/>
                <WeatherDetail measureType="windspeed" label="Wind" value={14}/>
                <WeatherDetail measureType="precipitation" label="Precipitation" value={0}/>
            </div>
        </div>
    )
}

function WeatherInfo({ location, date, temperature }: {
    location: string,
    date: Date,
    temperature: number
}): JSX.Element {

    return (
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-0 px-6 py-10 rounded-20 bg-today-small md:bg-today-large h-71.5 md:justify-between items-center">
            <div className="flex flex-col gap-y-3 ">
                <p className="text-preset-4 max-md:text-center">{location}</p>
                <p className="text-preset-6 max-md:text-center">{date.toDateString()}</p>
            </div>
            <div className="flex flex-row gap-x-5 items-center">
                <img src={SunnyIcon} alt="Sunny Icon" className="w-30 h-30"/>
                <p className="text-preset-1">{temperature}°</p>
            </div>
        </div>
    )
}

function WeatherDetail({ measureType, label, value }: { measureType: Nullable<MeasureType>, label: string, value: number }): JSX.Element {
    const units = useGlobalStore((store) => store.units)

    let unitLabel: string
    switch (measureType) {
        case "temperature":
            unitLabel = units.temperature == "celsius" ? "°C" : "°F"
            break
        case "windspeed":
            unitLabel = units.windspeed
            break
        case "precipitation":
            unitLabel = units.precipitation
            break
        default:
            unitLabel = "%"
    }

    return (
        <div className="h-29.5 flex flex-col gap-y-6 p-5 rounded-12 bg-neutral-800 border-neutral-600 border">
            <p className="text-preset-6">{label}</p>
            <p className="text-preset-3">{value} {unitLabel}</p>
        </div>
    )
}