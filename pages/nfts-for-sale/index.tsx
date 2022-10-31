import { withAuth } from "../../src/components/WithAuth";
import { useMoralis, useMoralisQuery } from "react-moralis";
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
  const { account } = useMoralis();

  const marketItems = useMoralisQuery("MarketItem", (query) =>
    query.notEqualTo("sold", true).notEqualTo("seller", account)
  );
  console.log(JSON.stringify(marketItems.data, null, 2));

  return (
    <>
      {/* <code style={{ whiteSpace: 'pre-line' }}>{ JSON.stringify(marketItems.data, null, 2)}</code> */}
      {marketItems.data.map((nft) => (
        <NFTCard
          contractType={"ERC721 - Mock"}
          amount={nft.get("price")}
          key={nft.get("tokenId")}
          name={"MinterToken - Mock"}
          symbol={"MTK - Mock"}
          tokenURI={""}
          tokenId={nft.get("tokenId")}
        >
          {nft.get("seller") !== account && (
            <BuyButton itemId={nft.get("itemId")} price={nft.get("price")} />
          )}
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
