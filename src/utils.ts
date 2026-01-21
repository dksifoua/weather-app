import type { UnitSystem } from "@/types"
import type { UnitsContextType } from "@/contexts/units.context"

export function getUpdateUnitSystem(
    {
        unitSystem,
        temperatureUnit,
        windSpeedUnit,
        precipitationUnit
    }: UnitsContextType
): UnitSystem {
    if (temperatureUnit === "celsius" && windSpeedUnit === "km/h" && precipitationUnit === "mm") {
        return "metric"
    }

    if (temperatureUnit === "fahrenheit" && windSpeedUnit === "mph" && precipitationUnit === "in") {
        return "imperial"
    }

    return unitSystem
}