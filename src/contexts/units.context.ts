import type { MeasureType, Nullable, UnitFor, UnitSystem } from "@/types"
import { createContext, type Dispatch } from "react"

export type UnitsContextType = {
    unitSystem: UnitSystem
    temperatureUnit: UnitFor<"temperature">
    windSpeedUnit: UnitFor<"wind-speed">
    precipitationUnit: UnitFor<"precipitation">
}

export const UnitsContext = createContext<Nullable<UnitsContextType>>(null)

export type UnitsAction =
    | { type: "SWITCH_UNIT_SYSTEM" }
    | { type: "SWITCH_MEASURE_UNIT", payload: { measureType: MeasureType } }

export const UnitsDispatchContext = createContext<Nullable<Dispatch<UnitsAction>>>(null)