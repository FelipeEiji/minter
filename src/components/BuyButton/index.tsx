import { Button } from "@chakra-ui/react";
import { useMoralis, useWeb3ExecuteFunction } from "react-moralis";
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  NFT_CONTRACT_ADDRESS,
} from "../../config/constants";
import MinterToken from "../../../contract/artifacts/contracts/MinterToken.sol/MinterToken.json";
import Marketplace from "../../../contract/artifacts/contracts/Marketplace.sol/Marketplace.json";

interface ButtonProps {
  itemId: string;
  price: number;
}

const BuyButton: React.FC<ButtonProps> = ({ itemId, price }) => {
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
    try {
      const result = await createMarketSale({
        params: {
          params: {
            nftContract: NFT_CONTRACT_ADDRESS,
            itemId: itemId,
          },
          msgValue: Number(price),
        },
      });

      console.log({ result })
    } catch (err) {
      console.error(err)
    }
  
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