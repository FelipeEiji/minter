import { InfoCircleOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
import React from "react";

export type NftTransactionsProps = {
  tokenId: string;
  nftContract: string;
};

const goToNftTransactions = (props: NftTransactionsProps) => {
  window.open(
    `https://polygonscan.com/token/${props.nftContract}?a=${props.tokenId}`,
    "__blank"
  );
};

export const NftTransactionsInfoButton: React.FC<NftTransactionsProps> = ({
  tokenId,
  nftContract,
}) => (
  <Tooltip placement="top" title="Transactions">
    <InfoCircleOutlined
      onClick={() =>
        goToNftTransactions({
          nftContract,
          tokenId,
        })
      }
    />
  </Tooltip>
);
