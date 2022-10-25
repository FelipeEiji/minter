import { Button } from "@chakra-ui/react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from "../../config/constants";
import MinterToken from "../../../contract/artifacts/contracts/MinterToken.sol/MinterToken.json";
import Marketplace from "../../../contract/artifacts/contracts/Marketplace.sol/Marketplace.json";

interface ButtonProps {
  tokenId: string;
}

const BuyButton: React.FC<ButtonProps> = ({ tokenId }) => {
  const {
    fetch: createMarketSale,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction({
    contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
    abi: Marketplace.abi,
    functionName: "createMarketSale",
  });

  const handleBuy = async () => {

    await createMarketSale({
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
      onClick={handleBuy}
    >
      Buy
    </Button>
  );
};

export default BuyButton;