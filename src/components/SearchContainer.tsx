import { type ChangeEvent, type JSX, useCallback, useState } from "react"
import SearchIcon from "@/assets/images/icon-search.svg"
import { getMatchingLocation } from "@/api/geocoding"
import type { GeoLocation } from "@/api/geocoding/schema"
import { useFetch } from "@/hooks/fetch.hook"
import type { Nullable, Result } from "@/types"
import { useWeather } from "@/hooks/weather.hook"

export function SearchContainer(): JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    const cachedGetMatchingLocationFunction = useCallback((query: string, signal: AbortSignal): Promise<Result<GeoLocation[]>> => getMatchingLocation(query, signal), [])
    const [matchedLocations, setMatchedLocations, , searchInput, setSearchInput] = useFetch<string, GeoLocation[]>(cachedGetMatchingLocationFunction)
    const [searchLocation, setSearchLocation] = useState<Nullable<GeoLocation>>(null)

    const [, setCoordinates] = useWeather()

    function searchInputOnChange(event: ChangeEvent<HTMLInputElement>): void {
        const value: string = event.target.value
        setSearchInput(value)
        setSearchLocation(null)

        if (value.length < 2) {
            setIsDropdownOpen(false)
            setMatchedLocations([])
        } else {
            setIsDropdownOpen(true)
        }
    }

    function updateSearchInput(location: GeoLocation): void {
        setSearchInput(`${location.city}, ${location.region}, ${location.country}`)
        setSearchLocation(location)
        setIsDropdownOpen(false)
    }

    function handleSearch(): void {
        if (searchLocation) {
            setCoordinates({ latitude: searchLocation.latitude, longitude: searchLocation.longitude })
        }
    }

    return (
        <div className="md:w-164 flex flex-col md:flex-row gap-y-3 md:gap-x-4 md:mx-auto">
            <div
                className="h-14 md:w-full flex flex-row items-center bg-neutral-800 rounded-12 relative">
                <img src={SearchIcon} alt="Search Icon" className="w-5 h-5 absolute left-6"/>
                <input type="search" name="searchInput" value={searchInput ?? ""} required
                       onChange={searchInputOnChange}
                       placeholder="Search for a place..."
                       className="w-full h-full pl-15 pr-5 placeholder:text-preset-5 color-neutral-200 rounded-12 border-focus-neutral"/>
                {
                    isDropdownOpen
                    && matchedLocations
                    && <SearchDropdown locations={matchedLocations} updateSearchInput={updateSearchInput}/>
                }
            </div>
            <button disabled={!searchLocation} className={`h-14 px-6 py-4 rounded-12 bg-blue-500 text-preset-5 ${
                !searchLocation ? "opacity-50" : "cursor-pointer border-focus-blue"
            }`} onClick={handleSearch}>Search
            </button>
        </div>
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