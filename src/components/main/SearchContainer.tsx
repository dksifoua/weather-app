import { type ChangeEvent, type JSX, useState } from "react"
import searchIcon from "@/assets/images/icon-search.svg"

export function SearchContainer(): JSX.Element {
    const [searchQuery, setSearchQuery] = useState<string>("")

    function onQueryChange(event: ChangeEvent<HTMLInputElement>): void {
        setSearchQuery(event.target.value)
    }

    console.log(`Search query updated: ${searchQuery}`)

    return (
        <form className="w-full lg:w-165 h-30 md:h-14 flex flex-col md:flex-row gap-y-3 md:gap-x-4 lg:mx-auto">
            <div className="basis-1/2 md:basis-8/10 flex flex-row items-center px-6 py-4 gap-x-4 bg-neutral-800 rounded-lg">
                <img src={searchIcon} className="w-6 h-6" alt="Search icon."/>
                <input type="text" name="search" value={searchQuery} onChange={onQueryChange}
                       placeholder="Search for a location" autoComplete="off"
                       className="w-full placeholder:text-preset-5 text-preset-5 text-neutral-200 caret-neutral-500 focus:outline-none"
                />
            </div>
            <button type="submit" className="basis-1/2 md:basis-2/10 rounded-lg bg-blue-500 text-preset-5 text-neutral-200">Search
            </button>
        </form>
    )
}