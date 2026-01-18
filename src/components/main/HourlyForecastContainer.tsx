import { type JSX, useEffect, useState } from "react"
import dropdownIcon from "@/assets/images/icon-dropdown.svg"
import sunnyIcon from "@/assets/images/icon-sunny.webp"

export function HourlyForecastContainer(): JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    useEffect(() => {
        if (!isDropdownOpen) return

        const timeoutId = setTimeout(() => {
            setIsDropdownOpen(false)
        }, 10000)
        return () => clearTimeout(timeoutId)
    }, [isDropdownOpen])

    return (
        <aside className="xl:basis-3/10 flex flex-col gap-y-4 px-4 py-5 bg-neutral-800 rounded-lg">
            <div className="relative">
                <div className="flex flex-row items-center justify-between">
                    <p className="text-preset-5">Hourly Forecast</p>
                    <div
                        className="flex flex-row px-4 py-2 gap-x-3 items-center justify-between bg-neutral-600 rounded-lg cursor-pointer"
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    >
                        <p>Tuesday</p>
                        <img src={dropdownIcon}
                             className={`transform ${isDropdownOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}
                             alt="Units Icon"
                        />
                    </div>
                </div>
                {isDropdownOpen && <DayDropdown/>}
            </div>
            <HourlyWeatherCard hour="3 PM" temperature="20°C"/>
            <HourlyWeatherCard hour="3 PM" temperature="20°C"/>
            <HourlyWeatherCard hour="3 PM" temperature="20°C"/>
            <HourlyWeatherCard hour="3 PM" temperature="20°C"/>
            <HourlyWeatherCard hour="3 PM" temperature="20°C"/>
            <HourlyWeatherCard hour="3 PM" temperature="20°C"/>
        </aside>
    )
}

function HourlyWeatherCard({ hour, temperature }: { hour: string, temperature: string }): JSX.Element {

    return (
        <div className="h-15 flex flex-row gap-y-2 px-3 py-2.5 bg-neutral-700 rounded-lg items-center justify-between">
            <img src={sunnyIcon} alt="Sunny Icon" className="w-10 h-auto basis-1/10"/>
            <p className="text-preset-5 text-left basis-9/10">{hour}</p>
            <p className="text-preset-7 basis-1/10">{temperature}</p>
        </div>
    )
}

function DayDropdown(): JSX.Element {

    return (
        <div className="w-55 flex flex-col gap-y-1 p-2 rounded-2xl bg-neutral-600 absolute right-0 top-12">
            <DayDropdownOption selected={false} day="Monday"/>
            <DayDropdownOption selected={true} day="Tuesday"/>
            <DayDropdownOption selected={false} day="Wednesday"/>
            <DayDropdownOption selected={false} day="Thursday"/>
            <DayDropdownOption selected={false} day="Friday"/>
            <DayDropdownOption selected={false} day="Saturday"/>
            <DayDropdownOption selected={false} day="Sunday"/>
        </div>
    )
}

function DayDropdownOption({ selected, day }: { selected: boolean, day: string }): JSX.Element {

    return (
        <div
            className={`w-full h-10 flex flex-row justify-between items-center rounded-lg px-2.5 ${selected ? "bg-neutral-700" : "hover:bg-neutral-700"}`}>
            <span className="text-preset-7">{day}</span>
        </div>
    )
}