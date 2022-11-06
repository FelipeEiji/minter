import {
  Col,
  Divider,
  Row,
} from "antd";
import React from "react";
import { MarketItem } from "../../models/marketItem";
import StoreCard from "../Cards/StoreNftCard";
import { MarketItemsResponse } from "./interface";
import PriceFilter from "./PriceFilter";
import styles from "./styles.module.css";

const toMarketItem = (response: MarketItemsResponse): MarketItem[] =>
  response.data.map((item) => ({
    name: item.get("name"),
    symbol: item.get("symbol"),
    token_id: item.get("tokenId"),
    token_uri: item.get("tokenURI"),
    itemId: item.get("itemId"),
    price: item.get("price"),
    seller: item.get("seller"),
  }));

const Store: React.FC<MarketItemsResponse> = (response) => (
  <>
    <PriceFilter />
    <Divider />
    <Row gutter={[16, 16]}>
      {toMarketItem(response).map((marketItem) => (
        <Col
          xs={24}
          sm={12}
          md={8}
          xl={6}
          className={styles.col}
          key={marketItem.token_id}
        >
          <StoreCard key={marketItem.itemId} marketItem={marketItem} />
        </Col>
      ))}
    </Row>
  </>
);

export default Store;
