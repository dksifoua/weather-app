import { type ChangeEvent, type JSX, useEffect, useState } from "react"
import SearchIcon from "@/assets/images/icon-search.svg"
import { getMatchingLocation } from "@/api/geocoding"
import type { GeoLocation } from "@/api/geocoding.schema"
import type { Result } from "@/api/types"
import type { Nullable } from "@/types"

export function SearchContainer(): JSX.Element {
    const [searchInput, setSearchInput] = useState<string>("")
    const [_searchLocation, setSearchLocation] = useState<Nullable<GeoLocation>>(null)
    const [possibleLocations, setPossibleLocations] = useState<GeoLocation[]>([])
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    useEffect((): void => {
        if (searchInput.length < 2) {
            setIsDropdownOpen(false)
            setPossibleLocations([])
            return
        }

        getMatchingLocation(searchInput).then((result: Result<GeoLocation[]>): void => {
            if (!result.success) {
                console.error(result.error)
                return
            }

            setPossibleLocations(result.data)
        })
    }, [searchInput])

    function searchInputOnChange(event: ChangeEvent<HTMLInputElement>): void {
        const value: string = event.target.value
        setSearchInput(value)

        if (value.length >= 2) {
            setIsDropdownOpen(true)
        }
    }

    function updateSearchInput(searchLocation: GeoLocation): void {
        setSearchInput(`${searchLocation.city}, ${searchLocation.region}, ${searchLocation.country}`)
        setSearchLocation(searchLocation)
        setIsDropdownOpen(false)
    }

    return (
        <form className="md:w-164 flex flex-col md:flex-row gap-y-3 md:gap-x-4 md:mx-auto">
            <div
                className="h-14 md:w-full flex flex-row items-center bg-neutral-800 rounded-12 relative">
                <img src={SearchIcon} alt="Search Icon" className="w-5 h-5 absolute left-6"/>
                <input type="search" value={searchInput} onChange={searchInputOnChange} onFocus={searchInputOnChange}
                       placeholder="Search for a place..."
                       className="w-full h-full pl-15 pr-5 placeholder:text-preset-5 color-neutral-200 rounded-12 border-focus-neutral"/>
                {isDropdownOpen && <SearchDropdown locations={possibleLocations} updateSearchInput={updateSearchInput}/>}
            </div>
            <button type="submit" className="h-14 px-6 py-4 rounded-12 bg-blue-500 text-preset-5 cursor-pointer border-focus-blue">Search</button>
        </form>
    )
}

function SearchDropdown({ locations, updateSearchInput }: {
    locations: GeoLocation[],
    updateSearchInput: (searchLocation: GeoLocation) => void
}): JSX.Element {

    return (
        <div
            className="w-full max-h-177 overflow-y-auto flex flex-col gap-y-1 p-2 rounded-12 bg-neutral-800 border border-neutral-700 absolute left-0 top-16">
            {
                locations.map((location: GeoLocation): JSX.Element => (
                    <div
                        key={location.id}
                        onClick={() => updateSearchInput(location)}
                        className="flex flex-col gap-y-1 px-2 py-2.5 rounded-8 hover:bg-neutral-700 hover:border hover:border-neutral-600 hover:cursor-pointer">
                        <p className="text-preset-6">{location.city}</p>
                        <p className="text-preset-7 text-neutral-300">{location.region}, {location.country}</p>
                    </div>
                ))
            }
        </div>
    )
}