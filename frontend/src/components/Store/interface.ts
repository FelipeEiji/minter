import Moralis from "moralis-v1/types";

export type MarketItemsResponse = {
  data: Moralis.Object<Moralis.Attributes>[];
  account: string | null;
};
