import type { Nullable } from "@/types"
import { type Dispatch, useContext } from "react"
import { type UnitsAction, UnitsContext, type UnitsContextType, UnitsDispatchContext } from "@/contexts/units.context"

export function useUnits(): UnitsContextType {
    const unitsContext: Nullable<UnitsContextType> = useContext(UnitsContext)

    if (!unitsContext) {
        throw new Error("Units context is not initialized")
    }

    return unitsContext
}

export function useUnitsDispatcher(): Dispatch<UnitsAction> {
    const dispatchContext: Nullable<Dispatch<UnitsAction>> = useContext(UnitsDispatchContext)

    if (!dispatchContext) {
        throw new Error("Units dispatch context is not initialized")
    }

    return dispatchContext
}