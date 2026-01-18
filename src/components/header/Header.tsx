import * as React from "react"
import logo from "@/assets/images/logo.svg"
import { UnitContainer } from "@/components/header/UnitContainer"

export function Header(): React.JSX.Element {

    return (
        <header className="w-full h-12 max-md:h-10 max-sm:h-8 flex flex-row justify-between">
            <div>
                <img src={logo} className="h-full w-auto" alt="Weather App Logo"/>
            </div>
            <UnitContainer />
        </header>
    )
}