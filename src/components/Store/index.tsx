import { MarketItemsResponse } from "./interface";
import StoreCard from "../Cards/StoreNftCard";
import { Nft } from "../../models/nft";
import { MarketItem } from "../../models/marketItem";

const toMarketItem = (response: MarketItemsResponse): MarketItem[] =>
  response.data.map((item) => ({
    name: item.get("name"),
    symbol: item.get("symbol"),
    token_id: item.get("tokenId"),
    token_uri: item.get("tokenURI"),
    itemId: item.get("itemId"),
    price: item.get("price")
  }));

const Store: React.FC<MarketItemsResponse> = (response) => (
  <>
    {toMarketItem(response).map(marketItem => <StoreCard key={marketItem.itemId} marketItem={marketItem} />)}
  </>
);

export default Store;
