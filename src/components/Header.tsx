import { type Dispatch, type JSX, useRef, useState } from "react"
import Logo from "@/assets/images/logo.svg"
import UnitsIcon from "@/assets/images/icon-units.svg"
import DropdownIcon from "@/assets/images/icon-dropdown.svg"
import CheckMarkIcon from "@/assets/images/icon-checkmark.svg"
import { useUnits, useUnitsDispatcher } from "@/hooks/units.hook"
import type { UnitsAction } from "@/contexts/units.context"
import type { MeasureType, UnitFor } from "@/types"
import { useCloseDropdown } from "@/hooks/dropdown.hook"

export function Header(): JSX.Element {

    return (
        <div className="flex flex-row h-8 md:h-11 justify-between items-center">
            <img src={Logo} alt="Weather app logo" className="h-full w-auto"/>
            <SettingsContainer/>
        </div>
    )
}

function SettingsContainer(): JSX.Element {
    const ref = useRef<HTMLDivElement>(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    useCloseDropdown(ref, (): void => setIsDropdownOpen(false))

    return (
        <div className="relative" ref={ref}>
            <button onClick={(): void => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex flex-row gap-x-1.5 md:gap-x-2.5 xl:gap-x-3 px-2.5 md:px-4 py-2 md:py-3 justify-between items-center bg-neutral-800 rounded-6 cursor-pointer border-focus-neutral"
            >
                <img src={UnitsIcon} alt="Units icon" className="h-3.5 md:h-4 w-3.5 md:w-4"/>
                <p className="text-preset-8 md:text-preset-7">Units</p>
                <img src={DropdownIcon} alt="Dropdown icon"
                     className={`w-2.25 md:w-3 h-3.5 md:h-4.5 transform ${isDropdownOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}/>
            </button>
            {isDropdownOpen && <UnitDropdown/>}
        </div>
    )
}

function UnitDropdown(): JSX.Element {
    const { unitSystem, temperatureUnit, windSpeedUnit, precipitationUnit } = useUnits()
    const dispatch: Dispatch<UnitsAction> = useUnitsDispatcher()

    return (
        <div
            className="w-70 h-auto flex flex-col gap-y-1 px-2 py-1.5 rounded-12 bg-neutral-800 absolute right-0 top-10 md:top-14 z-20"
        >
            <button onClick={() => dispatch({ type: "SWITCH_UNIT_SYSTEM" })}
                    className="h-10 px-2 py-2.5 text-preset-7 rounded-8 cursor-pointer border-focus-neutral">
                Switch to <span className="capitalize">{unitSystem === "metric" ? "imperial" : "metric"}</span>
            </button>
            <UnitDropdownOption measureType="temperature" label="Temperature" options={[
                { selected: temperatureUnit === "celsius", unit: "celsius", description: "Celsius (°C)" },
                { selected: temperatureUnit === "fahrenheit", unit: "fahrenheit", description: "Fahrenheit (°F)" }
            ]}/>
            <div className="h-px bg-neutral-600"/>
            <UnitDropdownOption measureType="wind-speed" label="Wind Speed" options={[
                { selected: windSpeedUnit === "km/h", unit: "km/h", description: "Kilometers per hour (km/h)" },
                { selected: windSpeedUnit === "mph", unit: "mph", description: "Miles per hour (mph)" }
            ]}/>
            <div className="h-px bg-neutral-600"/>
            <UnitDropdownOption measureType="precipitation" label="Precipitation" options={[
                { selected: precipitationUnit === "mm", unit: "mm", description: "Millimeters (mm)" },
                { selected: precipitationUnit === "in", unit: "in", description: "Inches (in)" }
            ]}/>
        </div>
    )
}

function UnitDropdownOption({ measureType, label, options }: {
    measureType: MeasureType
    label: string,
    options: { selected: boolean, unit: UnitFor<MeasureType>, description: string }[]
}): JSX.Element {
    const dispatch: Dispatch<UnitsAction> = useUnitsDispatcher()

    return (
        <div className="flex flex-col gap-y-2">
            <p className="px-2 pt-1.5 pb-0 text-neutral-300">{label}</p>
            {
                options.map((option, index) => (
                    <button
                        key={index}
                        onClick={() => !option.selected && dispatch({ type: "SWITCH_MEASURE_UNIT", payload: { measureType } })}
                        className={`h-10 flex flex-row gap-x-2.5 px-2 py-2.5 rounded-8 items-center justify-between ${
                            option.selected ? "bg-neutral-700" : "cursor-pointer border-focus-neutral"
                        }`}
                    >
                        <span className="text-preset-7">{option.description}</span>
                        {option.selected && <img src={CheckMarkIcon} alt="Checkmark icon" className="h-3.5 w-4.25"/>}
                    </button>
                ))
            }
        </div>
    )
}