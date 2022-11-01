import { ShoppingCartOutlined } from "@ant-design/icons";
import { Card } from "antd";
import React from "react";
import { MarketItem } from "../../models/marketItem";
import Loader from "../Loader";
import { useCreateMarketSale } from "./useCreateMarketSale";


const { Meta } = Card;

export type StoreCardProps = {
  marketItem: MarketItem
}

const StoreCard: React.FC<StoreCardProps> = ({ marketItem }) => {
  const { createMarketSale, isLoading } = useCreateMarketSale()

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
          isLoading ? <Loader /> : <ShoppingCartOutlined key="sell" onClick={() => createMarketSale({ itemId: marketItem.itemId, price: marketItem.price })}/>,
        ]}
      >
        <Meta title={`${marketItem.name}#${marketItem.token_id}`} description={marketItem.symbol} />
      </Card>
    </>
  );
};

export default StoreCard;
