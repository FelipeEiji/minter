import { ShopOutlined } from "@ant-design/icons";
import { Card, InputNumber, Modal } from "antd";
import { useRouter } from "next/router";
import React, { useRef } from "react";
import { Nft } from "../../models/nft";
import { useListNft } from "./useListNft";

const { Meta } = Card;

export type MyNftCardProps = {
  nft: Nft;
};

const MyNftCard: React.FC<MyNftCardProps> = ({ nft }) => {
  const { confirmLoading, setOpenSellModal, handleCancel, handleOk, openSellModal } = useListNft();
  const router = useRouter();

  const price = useRef<string>("0.001");

  return (
    <>
      <Card
        style={{ width: 300 }}
        cover={
          <img alt="token_uri" src={nft.token_uri} style={{ height: 300, objectFit: "cover" }} />
        }
        actions={[<ShopOutlined key="sell" onClick={() => setOpenSellModal(true)} />]}
      >
        <Meta title={`${nft.name}#${nft.token_id}`} description={nft.symbol} />
      </Card>
      <Modal
        title="Listar para venda"
        open={openSellModal}
        onOk={() =>
          handleOk({ tokenId: nft.token_id, price: price.current }).then(() =>
            router.push("/store")
          )
        }
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <InputNumber
          addonAfter={<div>Matic</div>}
          defaultValue={price.current}
          step="0.001"
          stringMode
          onChange={(value) => { price.current = String(value) }}
        />
      </Modal>
    </>
  );
};

export default MyNftCard;
