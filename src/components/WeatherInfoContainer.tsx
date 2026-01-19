import { type JSX } from "react"
import SunnyIcon from "@/assets/images/icon-sunny.webp"

export function WeatherInfoContainer(): JSX.Element {

    return (
        <div className="flex flex-col gap-y-5 lg:gap-y-8">
            <WeatherInfo location="Berlin, Germany" date={new Date()} temperature={20}/>
        </div>
    )
}

function WeatherInfo({ location, date, temperature }: {
    location: string,
    date: Date,
    temperature: number
}): JSX.Element {

    return (
        <div className="
            flex flex-col md:flex-row gap-y-4 md:gap-0 px-6 py-10 rounded-20 bg-[url('src/assets/images/bg-today-small.svg')]
            md:bg-[url('src/assets/images/bg-today-large.svg')] bg-no-repeat bg-cover bg-center h-71.5
        ">
            <div className="m-auto flex flex-col gap-y-3">
                <p className="text-preset-4 text-center">{location}</p>
                <p className="text-preset-6 text-center">{date.toDateString()}</p>
            </div>
            <div className="flex flex-row gap-x-5 items-center">
                <img src={SunnyIcon} alt="Sunny Icon" className="w-30 h-30"/>
                <p className="text-preset-1 text-center">{temperature}°</p>
            </div>
        </div>
    )
}