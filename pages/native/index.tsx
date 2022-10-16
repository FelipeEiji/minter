import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/evm-utils";
import { withAuth } from "../../src/components/with-auth";

const Native = ({ address, nativeBalance }: any) => {
  return (
    <div>
      <h3>Wallet: {address}</h3>
      <h3>Native Balance: {nativeBalance} ETH</h3>
    </div>
  );
};

export const getServerSideProps = withAuth(async () => {
  await Moralis.start({ apiKey: process.env.MORALIS_API_KEY });

  const address = "0xbfC1577355F2254f4C3d833a2389b7020A15f2A8";

  const nativeBalance = await Moralis.EvmApi.balance.getNativeBalance({
    chain: EvmChain.ETHEREUM,
    address,
  });

  return {
    props: {
      address,
      nativeBalance: nativeBalance.result.balance.ether,
    },
  };
});

export default Native;
