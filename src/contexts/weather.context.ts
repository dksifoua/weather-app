import { createContext, type Dispatch } from "react"
import type { WeatherData } from "@/api/weather/schema"
import type { Nullable } from "@/types"

export type WeatherContextType = Nullable<WeatherData>

export const WeatherContext = createContext<WeatherContextType>(null)

export type WeatherAction =
    | { type: "SET_DATA", payload: WeatherData }

export const WeatherDispatchContext = createContext<Nullable<Dispatch<WeatherAction>>>(null)