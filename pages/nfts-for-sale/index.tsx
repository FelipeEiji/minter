import { withAuth } from "../../src/components/WithAuth";
import { useMoralisQuery } from "react-moralis";
import { Spinner } from "@chakra-ui/react";
import Moralis from "moralis";
import {
  CHAIN_ID,
  MARKETPLACE_CONTRACT_ADDRESS,
  TOKEN_ADDRESSES,
} from "../../src/config/constants";
import NFTCard from "../../src/components/NFTCard";
import { GetWalletNFTsResponse } from "../../src/interfaces/interfaces";
import CreateMarketItemButton from "../../src/components/CreateMarketItemButton";
import BuyButton from "../../src/components/BuyButton";

interface Props {
  nfts: GetWalletNFTsResponse;
}

const NFTsForSale: React.FC<Props> = ({ nfts }) => {
    const marketItems = useMoralisQuery('MarketItem')
    console.log(JSON.stringify(marketItems.data, null, 2))
    
  return (
    <>
    {/* <code style={{ whiteSpace: 'pre-line' }}>{ JSON.stringify(marketItems.data, null, 2)}</code> */}
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
            <BuyButton tokenId={nft.token_id}/>
        </NFTCard>
      ))}
    </>
  );
};

export const getServerSideProps = async () => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
    chain: CHAIN_ID,
    address: MARKETPLACE_CONTRACT_ADDRESS,
    tokenAddresses: TOKEN_ADDRESSES,
  });

  return {
    props: {
      nfts: nfts.raw,
    },
  };
};

export default withAuth(NFTsForSale);
