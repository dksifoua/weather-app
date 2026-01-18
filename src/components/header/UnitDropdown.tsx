import { type JSX, useState } from "react"
import checkmarkIcon from "@/assets/images/icon-checkmark.svg"
import type { UnitSystem } from "@/types"

export function UnitDropdown(): JSX.Element {
    const [unitSystem, setUnitSystem] = useState<UnitSystem>("imperial")

    return (
        <div
            className="bg-neutral-800 px-2 py-1.5 gap-y-1 rounded-lg right-0 flex flex-col gap-1 w-75 h-auto absolute lg:top-14 md:top-12 top-10">
            <div className="px-2 py-2.5 font-medium cursor-pointer text-preset-7 text-center"
                 onClick={() => setUnitSystem(unitSystem === "imperial" ? "metric" : "imperial")}>
                Switch to <span className="capitalize">{unitSystem}</span>
            </div>
            <div className="divide-y divide-neutral-600">
                <UnitOption system={unitSystem} label="Temperature" metric="Celsius (°C)" imperial="Fahrenheit (°F)"/>
                <UnitOption system={unitSystem} label="Wind Speed" metric="Kilometer per hour (km/h)"
                            imperial="Miles per hour (mph)"/>
                <UnitOption system={unitSystem} label="Precipitation" metric="Millimeters (mm)" imperial="Inches (in)"/>
            </div>
        </div>
    )
}

type UnitOptionProps = {
    system: UnitSystem,
    label: string,
    metric: string,
    imperial: string,
}

function UnitOption({ system, label, metric, imperial }: UnitOptionProps): JSX.Element {

    return (
        <div className="flex flex-col gap-1">
            <span className="text-neutral-300 text-preset-8 text-base">{label}</span>
            <div
                className={`w-full h-10 gap-x-2 flex flex-row justify-between items-center rounded-lg px-2.5 ${system === "imperial" && "bg-neutral-700"}`}>
                <span className="text-preset-7">{imperial}</span>
                {system === "imperial" && <img src={checkmarkIcon} alt="Checkmark" className="w-4 h-4"/>}
            </div>
            <div
                className={`w-full h-10 gap-x-2 flex flex-row justify-between items-center rounded-lg px-2.5 ${system === "metric" && "bg-neutral-700"}`}>
                <span className="text-preset-7">{metric}</span>
                {system === "metric" && <img src={checkmarkIcon} alt="Checkmark" className="w-4 h-4"/>}
            </div>
        </div>
    )
}