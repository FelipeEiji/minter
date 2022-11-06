import { useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { usePriceFilter } from "../../contexts/PriceFilterContext";
import { MarketItemsResponse } from "./interface";

export type PriceOrder = "low_to_high" | "high_to_low";

export const useMarketItems = (): MarketItemsResponse => {
  const { account, Moralis } = useMoralis();

  const { filter } = usePriceFilter()

  const { data, fetch, isFetching } = useMoralisQuery(
    "MarketItem",
    (query) => {
      const qb = query.notEqualTo("sold", true).notEqualTo("canceled", true);

      if (filter.order) {
        if (filter.order === 'asc') {
          qb.ascending("price_decimal");
        } else {
          qb.descending("price_decimal");
        }
      }

      if (filter.min) {
        qb.greaterThanOrEqualTo("price_decimal", Number(Moralis.Units.ETH(filter.min)));
      }

      if (filter.max) {
        qb.lessThanOrEqualTo("price_decimal", Number(Moralis.Units.ETH(filter.max)));
      }

      return qb;
    },
    [account, filter],
    { autoFetch: false }
  );

  useEffect(() => {
    if (account && !isFetching) {
      fetch();
    }
  }, [account]);

  useEffect(() => {
    fetch();
  }, [filter]);

  return { data, account };
};
