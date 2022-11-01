import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import MinterToken from "../../../contract/artifacts/contracts/MinterToken.sol/MinterToken.json";
import Marketplace from "../../../contract/artifacts/contracts/Marketplace.sol/Marketplace.json";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from "../../config/constants";

export type CreateMarketItemRequest = {
    tokenId: string,
    price: string
}

export const useCreateMarketItem = () => {
  const { account, Moralis } = useMoralis();

  const { fetch: _createMarketItem } = useWeb3ExecuteFunction({
    contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
    abi: Marketplace.abi,
    functionName: "createMarketItem",
  });

  const { fetch: isApprovedForAll } = useWeb3ExecuteFunction({
    contractAddress: NFT_CONTRACT_ADDRESS,
    abi: MinterToken.abi,
    functionName: "isApprovedForAll",
  });

  const { fetch: setApprovalForAll } = useWeb3ExecuteFunction({
    contractAddress: NFT_CONTRACT_ADDRESS,
    abi: MinterToken.abi,
    functionName: "setApprovalForAll",
  });

  const createMarketItem = async ({ tokenId, price }: CreateMarketItemRequest) => {
    const isApproved = await isApprovedForAll({
      params: {
        params: {
          owner: account,
          operator: MARKETPLACE_CONTRACT_ADDRESS,
        },
      },
    });

    if (!isApproved) {
      await setApprovalForAll({
        params: {
          params: {
            operator: MARKETPLACE_CONTRACT_ADDRESS,
            approved: true,
          },
        },
      });
    }

    await _createMarketItem({
      params: {
        params: {
          nftContract: NFT_CONTRACT_ADDRESS,
          tokenId,
          price: Moralis.Units.ETH(price),
        },
      },
    });
  };

  return {
    createMarketItem,
  };
};
