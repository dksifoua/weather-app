import { type JSX } from "react"
import { Header } from "@/components/Header"

export function App(): JSX.Element {

    return (
        <>
            <Header/>
            <p className="text-preset-2 text-center md:w-96 lg:w-183 md:m-auto">How's the sky looking today?</p>
        </>
    )
}