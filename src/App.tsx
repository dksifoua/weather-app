import * as React from "react"
import { Header } from "@/components/header/Header"

export function App(): React.JSX.Element {

    return (
        <>
            <Header />
            <span className="text-preset-2 text-center">How's the sky looking today?</span>
        </>
    )
}