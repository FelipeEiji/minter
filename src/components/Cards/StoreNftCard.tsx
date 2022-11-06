import { UserOutlined } from "@ant-design/icons";
import { Card, Tooltip } from "antd";
import React from "react";
import { useMoralis } from "react-moralis";
import { MarketItem } from "../../models/marketItem";
import { NftTransactionsInfoButton } from "../NftTransactionsButton";
import CardAction from "./CardAction";

const { Meta } = Card;

export type StoreCardProps = {
  marketItem: MarketItem;
};

const goToPolygonScanAddress = (address: string) => {
  window.open(`https://mumbai.polygonscan.com/address/${address}`, "__blank");
};

const StoreCard: React.FC<StoreCardProps> = ({ marketItem }) => {
  const { Moralis } = useMoralis();

  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={
          <img
            alt="token_uri"
            src={marketItem.token_uri}
            style={{ height: 300, objectFit: "cover" }}
          />
        }
        actions={[
          <NftTransactionsInfoButton
            nftContract={marketItem.nftContract}
            tokenId={marketItem.token_id}
          />,
          <CardAction marketItem={marketItem} />,
          <Tooltip placement="top" title={"Seller Address"}>
            <UserOutlined
              onClick={() => goToPolygonScanAddress(marketItem.seller)}
            />
          </Tooltip>,
        ]}
      >
        <Meta
          title={`${marketItem.name}#${marketItem.token_id}`}
          description={`${marketItem.symbol} - ${Moralis.Units.FromWei(
            marketItem.price
          )} Matic`}
        />
      </Card>
    </>
  );
};

export default StoreCard;
