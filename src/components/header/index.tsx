import * as React from "react"
import logo from "@/assets/images/logo.svg"
import { UnitContainer } from "@/components/header/UnitContainer"

export function Header(): React.JSX.Element {

    return (
        <header className="w-full h-8 md:h-10 lg:h-12 flex flex-row justify-between">
            <div>
                <img src={logo} className="h-full w-auto" alt="Weather App Logo"/>
            </div>
            <UnitContainer />
        </header>
    )
}