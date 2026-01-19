import { type JSX, useEffect, useState } from "react"
import SearchIcon from "@/assets/images/icon-search.svg"
import { getMatchingLocation } from "@/api/geocoding"
import type { MatchedLocation } from "@/api/types"

export function SearchContainer(): JSX.Element {
    const [searchInput, setSearchInput] = useState<string>("")
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)
    const [locations, setLocations] = useState<MatchedLocation[]>([])

    useEffect(() => {
        if (searchInput.length < 2) {
            setIsDropdownOpen(false)
        }

        getMatchingLocation(searchInput).then(({ matchedLocations, error }) => {
            if (error) {
                console.error(error)
                return
            }

            setLocations(matchedLocations)
        })

        setIsDropdownOpen(true)
    }, [searchInput])

    return (
        <form className="md:w-164 flex flex-col md:flex-row gap-y-3 md:gap-x-4 md:mx-auto">
            <div
                className="h-14 md:w-full flex flex-row gap-x-4 px-6 py-4 items-center justify-between bg-neutral-800 rounded-12 relative">
                <img src={SearchIcon} alt="Search Icon" className="w-5 h-5"/>
                <input type="search" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
                       placeholder="Search for a place..."
                       className="w-full focus:outline-none placeholder:text-preset-5 color-neutral-200"/>
                {isDropdownOpen && <SearchDropdown locations={locations} updateSearchInput={setSearchInput}/>}
            </div>
            <button type="submit" className="h-14 px-6 py-4 rounded-12 bg-blue-500 text-preset-5">Search</button>
        </form>
    )
}

function SearchDropdown({ locations, updateSearchInput }: {
    locations: MatchedLocation[],
    updateSearchInput: (input: string) => void
}): JSX.Element {

    return (
        <div
            className="w-full flex flex-col gap-y-1 p-2 rounded-12 bg-neutral-800 border border-neutral-700 absolute left-0 top-16">
            {
                locations.map((location: MatchedLocation): JSX.Element => (
                    <div
                        key={location.id}
                        onClick={() => updateSearchInput(location.city)}
                        className="flex flex-col gap-y-1 px-2 py-2.5 rounded-8 hover:bg-neutral-700 hover:border hover:border-neutral-600 hover:cursor-pointer">
                        <p className="text-preset-6">{location.city}</p>
                        <p className="text-preset-7 text-neutral-300">{location.region}, {location.country}</p>
                    </div>
                ))
            }
        </div>
    )
}