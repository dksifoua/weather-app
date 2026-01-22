import { create } from "zustand/react"
import type { Coordinates, MeasureType, Nullable, Units, UnitSystem } from "@/types"

type GlobalStore = {
    coordinates: Nullable<Coordinates>
    setCoordinates: (coordinates: Coordinates) => void
    unitSystem: UnitSystem
    switchUnitSystem: () => void
    units: Units
    switchUnit: (measure: MeasureType) => void
}

export const useGlobalStore = create<GlobalStore>((set) => ({
    coordinates: null,
    setCoordinates: (coordinates) => set({ coordinates }),
    unitSystem: "metric",
    switchUnitSystem: () => set((store) => {
        const unitSystem = store.unitSystem === "metric" ? "imperial" : "metric"
        const units = getUnitsFor(unitSystem)
        return { unitSystem, units }
    }),
    units: { temperature: "celsius", windspeed: "km/h", precipitation: "mm" },
    switchUnit: (measure: MeasureType) => set((store) => {
        switch (measure) {
            case "temperature": {
                const temperature = store.units.temperature === "celsius" ? "fahrenheit" : "celsius"
                const unitSystem = getUnitSystem({ ...store.units, temperature }, store.unitSystem)
                return { unitSystem, units: { ...store.units, temperature } }
            }
            case "windspeed": {
                const windspeed = store.units.windspeed === "km/h" ? "mph" : "km/h"
                const unitSystem = getUnitSystem({ ...store.units, windspeed }, store.unitSystem)
                return { unitSystem, units: { ...store.units, windspeed } }
            }
            case "precipitation": {
                const precipitation = store.units.precipitation === "mm" ? "in" : "mm"
                const unitSystem = getUnitSystem({ ...store.units, precipitation }, store.unitSystem)
                return { unitSystem, units: { ...store.units, precipitation } }
            }
        }
    })
}))

function getUnitSystem(units: Units, defaultUnitSystem: UnitSystem): UnitSystem {
    if (units.temperature === "celsius" && units.windspeed === "km/h" && units.precipitation === "mm") {
        return "metric"
    }

    if (units.temperature === "fahrenheit" && units.windspeed === "mph" && units.precipitation === "in") {
        return "imperial"
    }

    return defaultUnitSystem
}

function getUnitsFor(unitSystem: UnitSystem): Units {
    return unitSystem === "metric"
        ? { temperature: "celsius", windspeed: "km/h", precipitation: "mm" }
        : { temperature: "fahrenheit", windspeed: "mph", precipitation: "in" }
}