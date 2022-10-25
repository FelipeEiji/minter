import { withAuth } from "../../src/components/WithAuth";
import Moralis from "moralis";
import { CHAIN_ID, TOKEN_ADDRESSES } from "../../src/config/constants";
import NFTCard from "../../src/components/NFTCard";
import { GetWalletNFTsResponse } from "../../src/interfaces/interfaces";
import CreateMarketItemButton from "../../src/components/CreateMarketItemButton";

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
        >
          <CreateMarketItemButton tokenId={nft.token_id} />
        </NFTCard>
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const address = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";

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
