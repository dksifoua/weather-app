import { type JSX, useEffect, useState } from "react"
import Logo from "@/assets/images/logo.svg"
import UnitsIcon from "@/assets/images/icon-units.svg"
import DropdownIcon from "@/assets/images/icon-dropdown.svg"
import CheckMarkIcon from "@/assets/images/icon-checkmark.svg"

export function Header(): JSX.Element {

    return (
        <div className="flex flex-row h-8 md:h-11 justify-between items-center">
            <img src={Logo} alt="Weather app logo" className="h-full w-auto"/>
            <SettingsContainer/>
        </div>
    )
}

function SettingsContainer(): JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    useEffect(() => {
        if (!isDropdownOpen) return

        const timeoutId = setTimeout(() => {
            setIsDropdownOpen(false)
        }, 7000)

        return () => clearTimeout(timeoutId)
    }, [isDropdownOpen]);

    return (
        <div className="relative">
            <div onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                 className="flex flex-row gap-x-1.5 md:gap-x-2.5 lg:gap-x-3 px-2.5 md:px-4 py-2 md:py-3 justify-between items-center bg-neutral-800 rounded-6"
            >
                <img src={UnitsIcon} alt="Units icon" className="h-3.5 md:h-4 w-3.5 md:w-4"/>
                <p className="text-preset-8 md:text-preset-7">Units</p>
                <img src={DropdownIcon} alt="Units icon"
                     className={`w-2.25 md:w-3 h-3.5 md:h-4.5 transform ${isDropdownOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}/>
            </div>
            {isDropdownOpen && <UnitDropdown/>}
        </div>
    )
}

type UnitSystem = "imperial" | "metric"

function UnitDropdown(): JSX.Element {
    const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial")

    return (
        <div
            className="w-55 h-auto flex flex-col gap-y-1 px-2 py-1.5 rounded-12 bg-neutral-800 absolute right-0 top-10"
        >
            <p onClick={() => setUnitSystem(unitSystem === "imperial" ? "metric" : "imperial")}
               className="h-10 px-2 py-2.5 text-preset-7 rounded-8 cursor-pointer"
            >
                Switch to <span className="capitalize">{unitSystem}</span>
            </p>
            <UnitDropdownOption unitSystem={unitSystem} label="Temperature" metric="Celsius (°C)"
                                imperial="Fahrenheit (°F)"/>
            <div className="h-px bg-neutral-600"/>
            <UnitDropdownOption unitSystem={unitSystem} label="Wind Speed" metric="Kilometers per hour (km/h)"
                                imperial="Miles per hour (mph)"/>
            <div className="h-px bg-neutral-600"/>
            <UnitDropdownOption unitSystem={unitSystem} label="Precipitation" metric="Millimeters (mm)"
                                imperial="Inches (in)"/>
        </div>
    )
}

function UnitDropdownOption({ unitSystem, label, metric, imperial }: {
    unitSystem: UnitSystem,
    label: string,
    metric: string,
    imperial: string
}): JSX.Element {

    return (
        <div className="flex flex-col gap-y-2">
            <p className="px-2 pt-1.5 pb-0 text-neutral-300">{label}</p>
            <div
                className={`h-10 flex flex-row gap-x-2.5 px-2 py-2.5 ${unitSystem === "metric" && "bg-neutral-700"} rounded-8 items-center justify-between cursor-pointer`}>
                <p>{metric}</p>
                {unitSystem === "metric" && <img src={CheckMarkIcon} alt="Checkmark icon" className="h-3.5 w-4.25"/>}
            </div>
            <div
                className={`h-10 flex flex-row gap-x-2.5 px-2 py-2.5 ${unitSystem === "imperial" && "bg-neutral-700"} rounded-8 items-center justify-between cursor-pointer`}>
                <p>{imperial}</p>
                {unitSystem === "imperial" && <img src={CheckMarkIcon} alt="Checkmark icon" className="h-3.5 w-4.25"/>}
            </div>
        </div>
    )
}