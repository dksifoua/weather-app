import type { WeatherAction } from "@/contexts/weather.context"
import type { WeatherData } from "@/api/weather/schema"
import type { Nullable } from "@/types"

export function weatherReducer(state: Nullable<WeatherData>, action: WeatherAction): Nullable<WeatherData> {
    switch (action.type) {
        case "SET_DATA":
            return action.payload
        default:
            return state
    }
}