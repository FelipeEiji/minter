import { withAuth } from "../../src/components/WithAuth";
import Moralis from "moralis";
import { CHAIN_ID, TOKEN_ADDRESSES } from "../../src/config/constants";
import NFTCard from "../../src/components/NFTCard";
import { EvmNftContractType } from '@moralisweb3/evm-utils';

interface GetWalletNFTsResponse {
  total: number;
  page: number;
  page_size: number;
  result: {
    token_address: string;
    token_id: string;
    contract_type: EvmNftContractType;
    owner_of: string;
    block_number: string;
    block_number_minted: string;
    token_uri?: string | undefined;
    metadata?: string | undefined;
    amount?: string | undefined;
    name: string;
    symbol: string;
    token_hash: string;
    last_token_uri_sync: string;
    last_metadata_sync: string;
  }[];
}

interface Props {
  nfts: GetWalletNFTsResponse;
}

const MyNFTs: React.FC<Props> = ({ nfts }) => {

  return (
    <>
      {nfts.result.map((nft) => (
        <NFTCard
          contractType={nft.contract_type}
          amount={Number(nft.amount)}
          key={nft.token_id}
          name={nft.name}
          symbol={nft.symbol}
          tokenURI={nft.token_uri}
          tokenId={nft.token_id}
        />
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const address = "0x365eabA465f3b8f05fce55D416C6F9fD4382b371";

  const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
    chain: CHAIN_ID,
    address,
    tokenAddresses: TOKEN_ADDRESSES,
  });

  return {
    props: {
      nfts: nfts.raw,
    },
  };
};

export default withAuth(MyNFTs);
