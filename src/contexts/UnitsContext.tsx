import type { MeasureType, Nullable, UnitFor, UnitSystem } from "@/types"
import { createContext, type Dispatch, type ReactNode, useReducer } from "react"

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

export function unitsReducer(state: UnitsContextType, action: UnitsAction): UnitsContextType {
    switch (action.type) {
        case "SWITCH_UNIT_SYSTEM":
            const newUnitSystem = state.unitSystem === "metric" ? "imperial" : "metric"
            return {
                unitSystem: newUnitSystem,
                temperatureUnit: newUnitSystem === "metric" ? "celsius" : "fahrenheit",
                windSpeedUnit: newUnitSystem === "metric" ? "km/h" : "mph",
                precipitationUnit: newUnitSystem === "metric" ? "mm" : "in"
            }
        case "SWITCH_MEASURE_UNIT":
            const { measureType } = action.payload
            switch (measureType) {
                case "temperature":
                    return {
                        ...state,
                        temperatureUnit: state.temperatureUnit === "celsius" ? "fahrenheit" : "celsius"
                    }
                case "wind-speed":
                    return {
                        ...state,
                        windSpeedUnit: state.windSpeedUnit === "km/h" ? "mph" : "km/h"
                    }
                case "precipitation":
                    return {
                        ...state,
                        precipitationUnit: state.precipitationUnit === "mm" ? "in" : "mm"
                    }
                default:
                    throw new Error(`Unknown measure type: ${measureType}`)
            }
        default:
            throw new Error(`Unknown action type: ${(action as UnitsAction).type}`)
    }
}

export const UnitsDispatchContext = createContext<Nullable<Dispatch<UnitsAction>>>(null)

export function UnitsContextProvider({ children }: { children: ReactNode }): ReactNode {
    const [units, dispatch] = useReducer<UnitsContextType, [action: UnitsAction]>(
        unitsReducer,
        {
            unitSystem: "metric",
            temperatureUnit: "celsius",
            windSpeedUnit: "km/h",
            precipitationUnit: "mm"
        }
    )

    return (
        <UnitsContext.Provider value={units}>
            <UnitsDispatchContext.Provider value={dispatch}>
                {children}
            </UnitsDispatchContext.Provider>
        </UnitsContext.Provider>
    )
}