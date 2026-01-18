import * as React from "react"
import { Header } from "@/components/header"
import { MainContent } from "@/components/main"

export function App(): React.JSX.Element {

    return (
        <>
            <Header />
            <span className="text-preset-2 text-center md:w-120 m-auto">How's the sky looking today?</span>
            <MainContent/>
        </>
    )
}