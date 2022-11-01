import { useWeb3ExecuteFunction } from "react-moralis";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from "../../config/constants";
import Marketplace from "../../../contract/artifacts/contracts/Marketplace.sol/Marketplace.json";

export type BuyRequest = { itemId: number, price: number }

export const useCreateMarketSale = () => {
  const {
    fetch: _createMarketSale,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction({
    contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
    abi: Marketplace.abi,
    functionName: "createMarketSale",
  });

  const createMarketSale = async ({ itemId, price }: BuyRequest) => {
    try {
      const result = await _createMarketSale({
        params: {
          params: {
            nftContract: NFT_CONTRACT_ADDRESS,
            itemId: itemId,
          },
          msgValue: Number(price),
        },
      });

      console.log({ result });
    } catch (err) {
      console.error(err);
    }
  };

  return { isLoading, createMarketSale };
};
