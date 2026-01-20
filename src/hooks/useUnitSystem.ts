import { UnitSystemContext, type UnitSystemContextType } from "@/context/UnitSystemContext"
import { useContext } from "react"
import type { Nullable } from "@/types"

export function useUnitSystem(): UnitSystemContextType {
    const unitSystemContext: Nullable<UnitSystemContextType> = useContext(UnitSystemContext)

    if (!unitSystemContext) {
        throw new Error("Unit system context is not initialized")
    }

    return unitSystemContext
}