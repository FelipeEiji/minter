import { Container, Heading, VStack } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import {
  useMoralis,
  useMoralisFile,
  useWeb3ExecuteFunction,
} from "react-moralis";
import { useState } from "react";
import { Spinner } from "@chakra-ui/react";
import FileUploader, {
  useFileUploader,
} from "../../src/components/FileUploader";
import { withAuth } from "../../src/components/WithAuth";
import MinterToken from "../../contract/artifacts/contracts/MinterToken.sol/MinterToken.json";
import { NFT_CONTRACT_ADDRESS } from "../../src/config/constants";
import MinterLayout from "../../src/components/Layout";
import { NextPageWithLayout } from "../../src/interfaces/interfaces";
import { useRouter } from "next/router";

const Mint: NextPageWithLayout = () => {
  const { file } = useFileUploader();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { account } = useMoralis();
  const { saveFile } = useMoralisFile();

  const { fetch: safeMint } = useWeb3ExecuteFunction({
    contractAddress: NFT_CONTRACT_ADDRESS,
    abi: MinterToken.abi,
    functionName: "safeMint",
  });

  const onClickCreate = async () => {
    try {
      setIsLoading(true);
      if (file) {
        const moralisFile = await saveFile(file.name, file, {
          saveIPFS: true,
        });

        if (!moralisFile) {
          throw new Error("Error while uploading to IPFS");
        }

        await safeMint({
          params: {
            params: {
              to: account,
              uri: moralisFile.ipfs(),
            },
          },
        });

        router.push("/my-nfts");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="md">
      <VStack>
        <Heading>Create a new item</Heading>
        <FileUploader />
        <Button
          colorScheme="blue"
          disabled={!file || isLoading}
          onClick={onClickCreate}
        >
          Create {isLoading && <Spinner />}
        </Button>
      </VStack>
    </Container>
  );
};

Mint.getLayout = function getLayout(page) {
  return <MinterLayout>{page}</MinterLayout>;
};

export default withAuth(Mint);
