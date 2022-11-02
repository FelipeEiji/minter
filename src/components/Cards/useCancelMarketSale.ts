import { useWeb3ExecuteFunction } from "react-moralis";
import Marketplace from "../../../contract/artifacts/contracts/Marketplace.sol/Marketplace.json";
import { MARKETPLACE_CONTRACT_ADDRESS } from "../../config/constants";

export type CancelRequest = { itemId: number };

export const useCancelMarketSale = () => {
  const {
    fetch: _cancelMarketSale,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction({
    contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
    abi: Marketplace.abi,
    functionName: "cancelMarketSale",
  });

  const cancelMarketSale = async ({ itemId }: CancelRequest) => {
    try {
      const result = await _cancelMarketSale({
        params: {
          params: {
            itemId: itemId,
          },
        },
      });

      console.log({ result });
    } catch (err) {
      console.error(err);
    }
  };

  return { isLoading, cancelMarketSale };
};
