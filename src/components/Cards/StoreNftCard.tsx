import { Card } from "antd";
import React from "react";
import { MarketItem } from "../../models/marketItem";
import CardAction from "./CardAction";

const { Meta } = Card;

export type StoreCardProps = {
  marketItem: MarketItem;
};

const StoreCard: React.FC<StoreCardProps> = ({ marketItem }) => {
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
        actions={[<CardAction marketItem={marketItem} />]}
      >
        <Meta title={`${marketItem.name}#${marketItem.token_id}`} description={marketItem.symbol} />
      </Card>
    </>
  );
};

export default StoreCard;
