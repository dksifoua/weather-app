import { type JSX } from "react"
import { Header } from "@/components/Header"
import { SearchContainer } from "@/components/SearchContainer"

export function App(): JSX.Element {

    return (
        <>
            <Header/>
            <p className="text-preset-2 text-center md:w-96 lg:w-183 md:m-auto">How's the sky looking today?</p>
            <main className="flex flex-col gap-y-8 lg:gap-y-12">
                <SearchContainer/>
            </main>
        </>
    )
}