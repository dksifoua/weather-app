import { type JSX } from "react"
import SunnyIcon from "@/assets/images/icon-sunny.webp"

export function WeatherInfoContainer(): JSX.Element {

    return (
        <div className="flex flex-col gap-y-5 xl:gap-y-8">
            <WeatherInfo location="Berlin, Germany" date={new Date()} temperature={20}/>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-x-5 xl:gap-x-6">
                <WeatherDetail label="Feels Like" value="18°"/>
                <WeatherDetail label="Humidity" value="46%"/>
                <WeatherDetail label="Wind" value="14 km/h"/>
                <WeatherDetail label="Precipitation" value="0 mm"/>
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

function WeatherDetail({ label, value }: { label: string, value: string }): JSX.Element {

    return (
        <div className="h-29.5 flex flex-col gap-y-6 p-5 rounded-12 bg-neutral-800 border-neutral-600 border">
            <p className="text-preset-6">{label}</p>
            <p className="text-preset-3">{value}</p>
        </div>
    )
}