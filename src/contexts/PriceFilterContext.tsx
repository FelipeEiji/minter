import { createContext, useContext } from "react";

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

export const usePriceFilter = () => useContext(PriceFilterContext)