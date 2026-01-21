import { getUpdateUnitSystem } from "@/utils"
import type { UnitsAction, UnitsContextType } from "@/contexts/units.context"

export function unitsReducer(state: UnitsContextType, action: UnitsAction): UnitsContextType {
    switch (action.type) {
        case "SWITCH_UNIT_SYSTEM": {
            const newUnitSystem = state.unitSystem === "metric" ? "imperial" : "metric"
            return {
                unitSystem: newUnitSystem,
                temperatureUnit: newUnitSystem === "metric" ? "celsius" : "fahrenheit",
                windSpeedUnit: newUnitSystem === "metric" ? "km/h" : "mph",
                precipitationUnit: newUnitSystem === "metric" ? "mm" : "in"
            }
        }
        case "SWITCH_MEASURE_UNIT": {
            const { measureType } = action.payload
            switch (measureType) {
                case "temperature": {
                    const updatedTemperatureUnit = state.temperatureUnit === "celsius" ? "fahrenheit" : "celsius"
                    return {
                        ...state,
                        temperatureUnit: updatedTemperatureUnit,
                        unitSystem: getUpdateUnitSystem({ ...state, temperatureUnit: updatedTemperatureUnit })
                    }
                }
                case "wind-speed": {
                    const updatedWindSpeedUnit = state.windSpeedUnit === "km/h" ? "mph" : "km/h"
                    return {
                        ...state,
                        windSpeedUnit: updatedWindSpeedUnit,
                        unitSystem: getUpdateUnitSystem({ ...state, windSpeedUnit: updatedWindSpeedUnit })
                    }
                }
                case "precipitation": {
                    const updatedPrecipitationUnit = state.precipitationUnit === "mm" ? "in" : "mm"
                    return {
                        ...state,
                        precipitationUnit: updatedPrecipitationUnit,
                        unitSystem: getUpdateUnitSystem({ ...state, precipitationUnit: updatedPrecipitationUnit })
                    }
                }
                default:
                    throw new Error(`Unknown measure type: ${measureType}`)
            }
        }
        default:
            throw new Error(`Unknown action type: ${(action as UnitsAction).type}`)
    }
}