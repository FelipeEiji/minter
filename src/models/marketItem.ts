import { Nft } from "./nft";

export type MarketItem = Nft & {
  itemId: number;
  price: number;
  seller: string;
  nftContract: string;
};
