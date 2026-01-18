import { type JSX } from "react"
import { SearchContainer } from "@/components/main/SearchContainer"
import { ContentContainer } from "@/components/main/ContentContainer"

export function MainContent(): JSX.Element {

    return (
        <main className="flex flex-col gap-y-8 lg:gap-x-12">
            <SearchContainer/>
            <ContentContainer/>
        </main>
    )
}