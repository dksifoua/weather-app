import { createContext, type ReactNode, useState } from "react"
import type { Nullable, UnitSystem } from "@/types"

export type UnitSystemContextType = {
    unitSystem: UnitSystem
    switchUnitSystem: () => void
    getSwitchUnitSystemTo: () => UnitSystem
}

export const UnitSystemContext = createContext<Nullable<UnitSystemContextType>>(null)

export function UnitSystemContextProvider({ children }: { children: ReactNode }): ReactNode {
    const [unitSystem, setUnitSystem] = useState<UnitSystem>("metric")

    function switchUnitSystem(): void {
        setUnitSystem((prevUnitSystem: UnitSystem): UnitSystem => prevUnitSystem === "metric" ? "imperial" : "metric")
    }

    function getSwitchUnitSystemTo(): UnitSystem {
        return unitSystem === "metric" ? "imperial" : "metric"
    }

    return (
        <UnitSystemContext.Provider value={{ unitSystem, switchUnitSystem, getSwitchUnitSystemTo }}>
            {children}
        </UnitSystemContext.Provider>
    )
}