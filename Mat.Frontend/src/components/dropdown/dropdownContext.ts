import React, { type Dispatch, type SetStateAction } from 'react'

interface DropdownContextType {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    dropdownRef?: React.RefObject<HTMLDivElement | null>
}

export const DropdownContext = React.createContext<DropdownContextType>({
    open: false,
    setOpen: () => {},
})
