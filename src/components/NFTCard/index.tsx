import {
  Box,
  Button,
  Center,
  HStack,
  Image,
  SimpleGrid,
  Spacer,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import { Eth } from "@web3uikit/icons";
import { FC } from "react";
import { EvmNftContractType } from "@moralisweb3/evm-utils";
import { useWeb3ExecuteFunction } from "react-moralis";
import MinterToken from "../../../contract/artifacts/contracts/MinterToken.sol/MinterToken.json";
import Marketplace from "../../../contract/artifacts/contracts/Marketplace.sol/Marketplace.json";
import { MARKETPLACE_CONTRACT_ADDRESS, NFT_CONTRACT_ADDRESS } from "../../config/constants";
import { useMoralis } from 'react-moralis'

interface NFTCardProps {
  amount?: number | undefined;
  contractType: EvmNftContractType;
  name?: string | undefined;
  symbol?: string | undefined;
  tokenURI?: string;
  tokenId: string;
}

const NFTCard: FC<NFTCardProps> = ({
  amount,
  contractType,
  name,
  symbol,
  tokenURI,
  tokenId,
}) => {
  const bgColor = useColorModeValue("none", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const descBgColor = useColorModeValue("gray.100", "gray.600");

  const { account } = useMoralis();

  const {
    fetch: createMarketItem,
    isFetching,
    isLoading,
  } = useWeb3ExecuteFunction({
    contractAddress: MARKETPLACE_CONTRACT_ADDRESS,
    abi: Marketplace.abi,
    functionName: "createMarketItem",
  });

  const {
    fetch: isApprovedForAll,
    isFetching: isApprovalForAllFetching,
    isLoading: isApprovalForAllIsLoading,
  } = useWeb3ExecuteFunction({
    contractAddress: NFT_CONTRACT_ADDRESS,
    abi: MinterToken.abi,
    functionName: "isApprovedForAll",
  });

  const {
    fetch: setApprovalForAll,
    isFetching: setApprovalForAllFetching,
    isLoading: setApprovalForAllIsLoading,
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
        }
      }
    })

    console.log({ isApproved })

    if (!isApproved) {
      const setApprovalResult = await setApprovalForAll({
        params: {
          params: {
            operator: MARKETPLACE_CONTRACT_ADDRESS,
            approved: true,
          }
        }
      })

      console.log({ setApprovalResult })

    }

    await createMarketItem({
      params: {
        params: {
          nftContract: NFT_CONTRACT_ADDRESS,
          tokenId,
          price: 1,
        }
      }
    })
  }

  return (
    <Box
      maxWidth="315px"
      bgColor={bgColor}
      padding={3}
      borderRadius="xl"
      borderWidth="1px"
      borderColor={borderColor}
    >
      <Box maxHeight="260px" overflow={"hidden"} borderRadius="xl">
        <Image
          src={tokenURI}
          alt={"nft"}
          minH="260px"
          minW="260px"
          boxSize="100%"
          objectFit="fill"
        />
      </Box>
      <Box mt="1" fontWeight="semibold" as="h4" noOfLines={1} marginTop={2}>
        {name}
      </Box>
      <HStack alignItems={"center"}>
        <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="smaller">
          {contractType}
        </Box>

        <Eth fontSize="20px" />
      </HStack>
      <SimpleGrid
        columns={2}
        spacing={4}
        bgColor={descBgColor}
        padding={2.5}
        borderRadius="xl"
        marginTop={2}
      >
        <Box>
          <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
            Symbol
          </Box>
          <Box as="h4" noOfLines={1} fontSize="sm">
            {symbol}
          </Box>
        </Box>
        <Box>
          <Box as="h4" noOfLines={1} fontWeight="medium" fontSize="sm">
            Amount
          </Box>
          <Box as="h4" noOfLines={1} fontSize="sm">
            {amount}
          </Box>
        </Box>
      </SimpleGrid>

      <Center>
        <Button
          isLoading={isLoading}
          loadingText="Submitting"
          colorScheme="teal"
          variant="outline"
          onClick={handleCreateMarketItem}
        >
          Create Market Item
        </Button>
      </Center>
    </Box>
  );
};

export default NFTCard;
