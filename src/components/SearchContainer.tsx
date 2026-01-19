import type { JSX } from "react"
import SearchIcon from "@/assets/images/icon-search.svg"

export function SearchContainer(): JSX.Element {

    return (
        <form className="md:w-164 flex flex-col md:flex-row gap-y-3 md:gap-x-4 md:mx-auto">
            <div className="h-14 md:w-full flex flex-row gap-x-4 px-6 py-4 items-center justify-between bg-neutral-800 rounded-12">
                <img src={SearchIcon} alt="Search Icon" className="w-5 h-5"/>
                <input type="search" placeholder="Search for a place..." className="w-full focus:outline-none placeholder:text-preset-5 color-neutral-200"/>
            </div>
            <button type="submit" className="h-14 px-6 py-4 rounded-12 bg-blue-500 text-preset-5">Search</button>
        </form>
    )
}