import { Container, Heading, VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { useMoralis, useMoralisFile, useWeb3ExecuteFunction } from "react-moralis";
import { useEffect } from "react";
import { Spinner } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
import FileUploader, {
  useFileUploader,
} from "../../src/components/FileUploader";
import { withAuth } from "../../src/components/WithAuth";
import MinterToken from "../../contract/artifacts/contracts/MinterToken.sol/MinterToken.json";
import { NFT_CONTRACT_ADDRESS } from "../../src/config/constants";

const Mint = () => {
  const { file } = useFileUploader();
  const { data } = useSession();

  useEffect(() => console.log(data), [data]);

  const { account } = useMoralis();
  const { isUploading, saveFile } = useMoralisFile();

  const {
    fetch: safeMint,
    isFetching: safeMintFetching,
    isLoading: safeMintLoading,
  } = useWeb3ExecuteFunction({
    contractAddress: NFT_CONTRACT_ADDRESS,
    abi: MinterToken.abi,
    functionName: "safeMint",
  });
  
  const onClickCreate = async () => {
    if (file) {
      const moralisFile = await saveFile(file.name, file, {
        saveIPFS: true,
      });

      if (!moralisFile) throw new Error('Error while uploading to IPFS')

      await safeMint({
        params: {
          params: {
            to: account,
            uri: moralisFile.ipfs(),
          }
        }
      })
    }
  };

  return (
    <Container maxW="md">
      <VStack>
        <Heading>Create a new item</Heading>
        <FileUploader />
        <Button
          colorScheme="blue"
          disabled={!file || isUploading}
          onClick={onClickCreate}
        >
          Create {isUploading && <Spinner />}
        </Button>
      </VStack>
    </Container>
  );
};

export default withAuth(Mint);
