import React, { createContext, useContext, useState } from "react";

export type Order = "asc" | "desc";

export type PriceFilter = {
    min?: number;
    max?: number;
    order: Order;
}

export type PriceFilterContextType = {
    filter: PriceFilter
    setFilter: (value: PriceFilter) => void
}

export const PriceFilterContext = createContext<PriceFilterContextType>({ filter: { order: 'asc' }, setFilter: () => null })

export const PriceFilterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [filter, setFilter] = useState<PriceFilter>({ order: 'asc' })

    return (
        <PriceFilterContext.Provider value={{ filter, setFilter }}>
            {children}
        </PriceFilterContext.Provider>
    )
}


export const usePriceFilter = () => useContext(PriceFilterContext)