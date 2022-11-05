import { Button } from "@chakra-ui/react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from "../../config/constants";
import MinterToken from "../../../contract/artifacts/contracts/MinterToken.sol/MinterToken.json";
import Marketplace from "../../../contract/artifacts/contracts/Marketplace.sol/Marketplace.json";
import React from "react";

interface ButtonProps {
  tokenId: string;
}

const CreateMarketItemButton: React.FC<ButtonProps> = ({ tokenId }) => {
  const { account } = useMoralis();

  const {
    fetch: createMarketItem,
    isLoading,
  } = useWeb3ExecuteFunction({
    contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
    abi: Marketplace.abi,
    functionName: "createMarketItem",
  });

  const {
    fetch: isApprovedForAll,
  } = useWeb3ExecuteFunction({
    contractAddress: NFT_CONTRACT_ADDRESS,
    abi: MinterToken.abi,
    functionName: "isApprovedForAll",
  });

  const {
    fetch: setApprovalForAll,
  } = useWeb3ExecuteFunction({
    contractAddress: NFT_CONTRACT_ADDRESS,
    abi: MinterToken.abi,
    functionName: "setApprovalForAll",
  });

  const handleCreateMarketItem = async () => {
    const isApproved = await isApprovedForAll({
      params: {
        params: {
          owner: account,
          operator: MARKETPLACE_CONTRACT_ADDRESS,
        },
      },
    });

    console.log({ isApproved });

    if (!isApproved) {
      const setApprovalResult = await setApprovalForAll({
        params: {
          params: {
            operator: MARKETPLACE_CONTRACT_ADDRESS,
            approved: true,
          },
        },
      });

      console.log({ setApprovalResult });
    }

    await createMarketItem({
      params: {
        params: {
          nftContract: NFT_CONTRACT_ADDRESS,
          tokenId,
          price: 1,
        },
      },
    });
  };

  return (
    <Button
      isLoading={isLoading}
      loadingText="Submitting"
      colorScheme="teal"
      variant="outline"
      onClick={handleCreateMarketItem}
    >
      Create Market Item
    </Button>
  );
};

export default CreateMarketItemButton;