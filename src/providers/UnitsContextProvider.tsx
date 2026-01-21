import { type UnitsAction, UnitsContext, type UnitsContextType, UnitsDispatchContext } from "@/contexts/UnitsContext"
import { type ReactNode, useReducer } from "react"
import { unitsReducer } from "@/reducers/units.reducer"

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