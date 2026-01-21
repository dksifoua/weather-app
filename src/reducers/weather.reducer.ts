import type { WeatherAction, WeatherContextType } from "@/contexts/weather.context"

export function weatherReducer(state: WeatherContextType, action: WeatherAction): WeatherContextType {
    switch (action.type) {
        case "SET_DATA":
            return action.payload
        default:
            return state
    }
}