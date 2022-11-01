import Moralis from "moralis";
import { CHAIN_ID, TOKEN_ADDRESSES } from "../../src/config/constants";
import { GetWalletNFTsResponse, NextPageWithLayout } from "../../src/interfaces/interfaces";
import nookies from "nookies";
import { useMoralis } from "react-moralis";
import { useEffect, useRef } from "react";
import MinterLayout from "../../src/components/Layout";
import MyNftCard from "../../src/components/Cards/MyNftCard";
import { Row, Col, Empty } from "antd";
import styles from './styles.module.css'
import { withAuth } from "../../src/components/WithAuth";


type Props = {
  nfts: GetWalletNFTsResponse;
};

const MyNFTs: NextPageWithLayout<Props> = ({ nfts }) => {
  const { account } = useMoralis();
  const currentAccountRef = useRef<string | null>(null);


  useEffect(() => {
    if (
      currentAccountRef.current !== account &&
      account !== null &&
      currentAccountRef.current !== null
    ) {
      window.location.reload();
    }
    currentAccountRef.current = account;
  }, [account]);

  if (!nfts.result.length) {
    return <Empty description="You don't have any NFTs"/>
  }

  return (
    <Row gutter={[16, 16]}>
      {nfts.result.map((nft) => (
        <Col xs={24} sm={12} md={8} xl={6} className={styles.col} key={nft.token_id} >
          <MyNftCard nft={nft}/>
        </Col>
      ))}
    </Row>
  );
};

MyNFTs.getLayout = function getLayout(page) {
  return <MinterLayout>{page}</MinterLayout>;
};

export const getServerSideProps = async (context: any) => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const account = nookies.get(context, "account");

  console.log({ account });

  if (!account?.account) {
    return {
      props: {
        nfts: {
          result: [],
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
