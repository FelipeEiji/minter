import { CloseOutlined, ShoppingCartOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import { useRouter } from "next/router";
import React from "react";
import { useMoralis } from "react-moralis";
import { MarketItem } from "../../interfaces/marketItem";
import Loader from "../Loader";
import { useCancelMarketItem } from "./useCancelMarketItem";
import { useBuyMarketItem } from "./useBuyMarketItem";

export type CardActionProps = {
  marketItem: MarketItem;
};

const CardAction: React.FC<CardActionProps> = ({ marketItem }) => {
  const { buyMarketItem, isLoading: isLoadingCreateRequest } = useBuyMarketItem();
  const { cancelMarketItem, isLoading: isLoadingCancelRequest } = useCancelMarketItem();
  const { account } = useMoralis();
  const router = useRouter();

  if (isLoadingCreateRequest || isLoadingCancelRequest) {return <Loader />;}
  if (account === marketItem.seller)
    {return (
      <CloseOutlined
        key="cancel"
        onClick={() =>
          cancelMarketItem({
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
        buyMarketItem({
          itemId: marketItem.itemId,
          price: marketItem.price,
        }).then(() => router.push("/my-nfts"));
      }}
    />
    </Tooltip>
  );
};

export default CardAction;
