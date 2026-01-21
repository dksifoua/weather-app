import { type ReactNode, useReducer } from "react"
import {
    type WeatherAction,
    WeatherContext,
    type WeatherContextType,
    WeatherDispatchContext
} from "@/contexts/weather.context"
import { weatherReducer } from "@/reducers/weather.reducer"

export function WeatherContextProvider({ children }: { children: ReactNode }): ReactNode {
    const [weatherData, dispatch] = useReducer<WeatherContextType, [action: WeatherAction]>(weatherReducer, null)

    return (
        <WeatherContext.Provider value={weatherData}>
            <WeatherDispatchContext.Provider value={dispatch}>
                {children}
            </WeatherDispatchContext.Provider>
        </WeatherContext.Provider>
    )
}