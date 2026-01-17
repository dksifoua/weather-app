import * as React from "react"
import logo from "@/assets/images/logo.svg"
import { UnitContainer } from "@/components/header/UnitContainer"

export function Header(): React.JSX.Element {

    return (
        <header className="w-full h-auto flex flex-row">
            <div className="basis-9/10">
                <img src={logo} alt="Weather App Logo"/>
            </div>
            <UnitContainer />
        </header>
    )
}