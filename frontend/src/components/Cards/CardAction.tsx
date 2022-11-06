import { CloseOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useMoralis } from "react-moralis";
import { MarketItem } from "../../interfaces/marketItem";
import Loader from "../Loader";
import { useCancelMarketSale } from "./useCancelMarketSale";
import { useCreateMarketSale } from "./useCreateMarketSale";

export type CardActionProps = {
  marketItem: MarketItem;
};

const CardAction: React.FC<CardActionProps> = ({ marketItem }) => {
  const { createMarketSale, isLoading: isLoadingCreateRequest } = useCreateMarketSale();
  const { cancelMarketSale, isLoading: isLoadingCancelRequest } = useCancelMarketSale();
  const { account } = useMoralis();
  const router = useRouter();

  if (isLoadingCreateRequest || isLoadingCancelRequest) {return <Loader />;}
  if (account === marketItem.seller)
    {return (
      <CloseOutlined
        key="cancel"
        onClick={() =>
          cancelMarketSale({
            itemId: marketItem.itemId,
          }).then(() => router.push("/my-nfts"))
        }
      />
    );}

  return (
    <Tooltip placement="top" title={"Buy"}>
    <ShoppingCartOutlined
      key="buy"
      onClick={() => {
        createMarketSale({
          itemId: marketItem.itemId,
          price: marketItem.price,
        }).then(() => router.push("/my-nfts"));
      }}
    />
    </Tooltip>
  );
};

export default CardAction;
