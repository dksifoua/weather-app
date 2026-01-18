import { type JSX, useEffect, useState } from "react"
import unitIcon from "@/assets/images/icon-units.svg"
import dropdownIcon from "@/assets/images/icon-dropdown.svg"
import { UnitDropdown } from "@/components/header/UnitDropdown"

export function UnitContainer(): JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false)

    useEffect(() => {
        if (!isDropdownOpen) return

        const timeoutId = setTimeout(() => {
            setIsDropdownOpen(false)
        }, 10000)
        return () => clearTimeout(timeoutId)
    }, [isDropdownOpen])

    return (
        <div className="relative">
            <div className="flex flex-row justify-center items-center bg-neutral-800 rounded-lg cursor-pointer
                w-24 h-full gap-x-1.5
                md:w-28 md:gap-x-2
                lg:w-30 lg:gap-x-2.5
            " onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                <img src={unitIcon} alt="Units Icon"/>
                <span className="text-preset-7">Units</span>
                <img src={dropdownIcon}
                     className={`transform ${isDropdownOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}
                     alt="Units Icon"
                />
            </div>
            {isDropdownOpen && <UnitDropdown/>}
        </div>
    )
}