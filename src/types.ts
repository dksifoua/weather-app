export type Nullable<T> = T | null
export type Result<T> =
    | { success: false, error: Error }
    | { success: true, data: T }

export type UnitSystem = "imperial" | "metric"
export type MeasureType = "temperature" | "wind-speed" | "precipitation"
export type UnitFor<T extends MeasureType> =
    T extends "temperature" ? "celsius" | "fahrenheit" :
        T extends "wind-speed" ? "km/h" | "mph" :
            T extends "precipitation" ? "mm" | "in"
                : never