import { withAuth } from "../../src/components/WithAuth";
import Moralis from "moralis";
import { CHAIN_ID, TOKEN_ADDRESSES } from "../../src/config/constants";
import NFTCard from "../../src/components/NFTCard";
import { GetWalletNFTsResponse } from "../../src/interfaces/interfaces";
import CreateMarketItemButton from "../../src/components/CreateMarketItemButton";
import nookies from 'nookies';
import { useMoralis } from "react-moralis";
import { useEffect, useRef } from "react";

interface Props {
  nfts: GetWalletNFTsResponse;
}

const MyNFTs: React.FC<Props> = ({ nfts }) => {
  const { account } = useMoralis();
  const currentAccountRef = useRef<string | null>(null)

  useEffect(() => {
    if (currentAccountRef.current !== account && account !== null && currentAccountRef.current !== null) {
      window.location.reload()
    }
    currentAccountRef.current = account
  }, [account])

  return (
    <>
      {nfts.result.map((nft) => (
        <NFTCard
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

export const getServerSideProps = async (context: any) => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const account = nookies.get(context, 'account')

  console.log({ account })

  if (!account?.account) {
    return {
      props: {
        nfts: {
          result: []
        },
      },
    };
  }

  const nfts = await Moralis.EvmApi.nft.getWalletNFTs({
    chain: CHAIN_ID,
    address: account.account,
    tokenAddresses: TOKEN_ADDRESSES,
  });

  return {
    props: {
      nfts: nfts.raw,
    },
  };
};

export default withAuth(MyNFTs);
