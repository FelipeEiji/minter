import { useWeb3ExecuteFunction } from "react-moralis";
import Marketplace from "../../abis/MarketPlace.json";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../../config/constants";

export type CancelRequest = { itemId: number };

export const useCancelMarketItem = () => {
  const {
    fetch: _cancelMarketItem,
    isLoading,
  } = useWeb3ExecuteFunction({
    contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
    abi: Marketplace.abi,
    functionName: "cancelMarketItem",
  });

  const cancelMarketItem = async ({ itemId }: CancelRequest) => {
    try {
      const result = await _cancelMarketItem({
        params: {
          params: {
            itemId,
          },
        },
      });

      console.log({ result });
    } catch (err) {
      console.error(err);
    }
  };

  return { isLoading, cancelMarketItem };
};
