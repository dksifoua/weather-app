import * as React from "react"
import unitIcon from "@/assets/images/icon-units.svg"
import dropdownIcon from "@/assets/images/icon-dropdown.svg"

export function UnitContainer(): React.JSX.Element {
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false)

    return (
        <div className="bg-neutral-800 basis-1/10 h-auto rounded-md flex flex-row justify-center items-center gap-x-2">
            <img src={unitIcon} alt="Units Icon"/>
            <span>Units</span>
            <img src={dropdownIcon}
                 className={`transform ${isDropdownOpen ? '-rotate-180' : 'rotate-0'} transition-transform duration-300 ease-in-out`}
                 onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                 alt="Units Icon"
            />
        </div>
    )
}