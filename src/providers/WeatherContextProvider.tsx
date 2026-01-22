import { type ReactNode, useReducer } from "react"
import { type WeatherAction, WeatherContext, WeatherDispatchContext } from "@/contexts/weather.context"
import { weatherReducer } from "@/reducers/weather.reducer"
import type { WeatherData } from "@/api/weather/schema"
import type { Nullable } from "@/types"

export function WeatherContextProvider({ children }: { children: ReactNode }): ReactNode {
    const [weatherData, dispatch] = useReducer<Nullable<WeatherData>, [action: WeatherAction]>(weatherReducer, null)

    return (
        <WeatherContext.Provider value={weatherData}>
            <WeatherDispatchContext.Provider value={dispatch}>
                {children}
            </WeatherDispatchContext.Provider>
        </WeatherContext.Provider>
    )
}