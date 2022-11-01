import { Empty } from "antd";
import MinterLayout from "../../src/components/Layout";
import Store from "../../src/components/Store";
import { useMarketItems } from "../../src/components/Store/useMarketItems";
import { withAuth } from "../../src/components/WithAuth";
import { NextPageWithLayout } from "../../src/interfaces/interfaces";

const StorePage: NextPageWithLayout = () => {
  const { account, data } = useMarketItems();

  if (!data.length) {
    return <Empty description="There's no item at the moment"/>
  }

  return <Store account={account} data={data} />;
};

StorePage.getLayout = function getLayout(page) {
  return <MinterLayout>{page}</MinterLayout>;
};


export default withAuth(StorePage);
