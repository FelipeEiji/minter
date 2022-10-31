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
import { Matic } from "@web3uikit/icons";
import { FC } from "react";
import { EvmNftContractType } from "@moralisweb3/evm-utils";

interface NFTCardProps {
  amount?: number | undefined;
  contractType: EvmNftContractType;
  name?: string | undefined;
  symbol?: string | undefined;
  tokenURI?: string;
  tokenId: string;
  children: React.ReactNode,
}

const NFTCard: FC<NFTCardProps> = ({
  amount,
  contractType,
  name,
  symbol,
  tokenURI,
  children,
}) => {
  const bgColor = useColorModeValue("none", "gray.700");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const descBgColor = useColorModeValue("gray.100", "gray.600");


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
          ContractType - {contractType}
        </Box>

        <Matic fontSize="20px" />
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

      <Center marginTop="3">
       { children }
      </Center>
    </Box>
  );
};

export default NFTCard;
