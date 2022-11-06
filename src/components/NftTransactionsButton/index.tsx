import { InfoCircleOutlined } from "@ant-design/icons";
import React from "react";

export type NftTransactionsProps = {
  tokenId: string;
  nftContract: string;
};

const goToNftTransactions = (props: NftTransactionsProps) => {
  window.open(
    `https://mumbai.polygonscan.com/token/${props.nftContract}?a=${props.tokenId}`,
    "__blank"
  );
};

export const NftTransactionsInfoButton: React.FC<NftTransactionsProps> = ({
  tokenId,
  nftContract,
}) => (
  <InfoCircleOutlined
    onClick={() =>
      goToNftTransactions({
        nftContract,
        tokenId,
      })
    }
  />
);
