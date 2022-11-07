import { useWeb3ExecuteFunction } from "react-moralis";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
} from "../../config/constants";
import Marketplace from "../../abis/MarketPlace.json";

export type BuyRequest = { itemId: number, price: number }

export const useBuyMarketItem = () => {
  const {
    fetch: _buyMarketItem,
    isLoading,
  } = useWeb3ExecuteFunction({
    contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
    abi: Marketplace.abi,
    functionName: "buyMarketItem",
  });

  const buyMarketItem = async ({ itemId, price }: BuyRequest) => {
    try {
      const result = await _buyMarketItem({
        params: {
          params: {
            itemId,
          },
          msgValue: Number(price),
        },
      });

      console.log({ result });
    } catch (err) {
      console.error(err);
    }
  };

  return { isLoading, buyMarketItem };
};
