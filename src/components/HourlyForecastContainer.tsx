import { type JSX, useRef, useState } from "react"
import DropdownIcon from "@/assets/images/icon-dropdown.svg"
import SunnyIcon from "@/assets/images/icon-sunny.webp"
import { useCloseDropdown } from "@/hooks/close-dropdown.hook"

const daysOfWeek: string[] = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export function HourlyForecastContainer({ date }: { date: Date }): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    useCloseDropdown(ref, (): void => setIsDropdownOpen(false))

    return (
            <div className="h-full flex flex-col gap-y-4 px-4 md:px-6 py-5 md:py-6 rounded-20 bg-neutral-800">
                <div className="relative" ref={ref}>
                    <div className="flex flex-row items-center justify-between">
                        <p className="text-preset-5">Hourly Forecast</p>
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                             className="flex flex-row gap-x-3 px-4 py-2 rounded-8 bg-neutral-600 cursor-pointer items-center border-focus-neutral"
                        >
                            <p className="text-preset-7 ">{daysOfWeek[date.getDay()]}</p>
                            <img src={DropdownIcon} alt="Dropdown icon"
                                 className={`w-3 h-4.5 transform ${isDropdownOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}/>
                        </button>
                    </div>
                    {isDropdownOpen && <DaysDropdown date={date}/>}
                </div>
                <HourlyWeatherCard/>
                <HourlyWeatherCard/>
                <HourlyWeatherCard/>
                <HourlyWeatherCard/>
                <HourlyWeatherCard/>
            </div>
    )
}

function HourlyWeatherCard(): JSX.Element {

    return (
        <div className="h-15 flex flex-row gap-x-2 pl-3 pr-4 py-2.5 rounded-8 bg-neutral-700 border border-neutral-600 items-center justify-between">
            <img src={SunnyIcon} alt="Sunny Icon" className="w-10 h-10"/>
            <p className="w-full text-preset-5">3 PM</p>
            <p className="text-preset-7">68°</p>
        </div>
    )
}

function DaysDropdown({ date }: { date: Date }): JSX.Element {
    const selectedDay = daysOfWeek[date.getDay()]

    return (
        <div className="w-53.5 flex flex-col gap-y-1 p-2 rounded-12 bg-neutral-800 border border-neutral-600 absolute right-0 top-12">
            {
                daysOfWeek.map((day: string, index: number) => {
                    return (
                        <div key={index} className={`h-10 px-2 py-2.5 flex flex-row items-center justify-between ${day === selectedDay ? "rounded-8 bg-neutral-700" : "hover:rounded-8 hover:bg-neutral-700"}`}>
                            <p>{day}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}