import { useEffect } from "react";
import { useMoralis, useMoralisQuery } from "react-moralis";
import { MarketItemsResponse } from "./interface";


export const useMarketItems = (): MarketItemsResponse => {
    const { account } = useMoralis();

    const { data, fetch, isFetching } = useMoralisQuery("MarketItem", (query) =>
      query.notEqualTo("sold", true).notEqualTo("seller", account)
    , [account], { autoFetch: false });
  
    useEffect(() => {
      if (account && !isFetching) {
        fetch()
      }
    }, [account])
  
    return { data, account }
}
