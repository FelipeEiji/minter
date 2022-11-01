import { useState } from "react";
import { CreateMarketItemRequest, useCreateMarketItem } from "./useCreateMarketItem";


export const useListNft = () => {
  const [openSellModal, setOpenSellModal] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const { createMarketItem } = useCreateMarketItem()

  const handleOk = async (request: CreateMarketItemRequest) => {
    try {
        setConfirmLoading(true);
        await createMarketItem(request)
    } finally {
        setOpenSellModal(false);
        setConfirmLoading(false);    
    }
  };

  const handleCancel = () => {
    console.log("Clicked cancel button");
    setOpenSellModal(false);
  };

  return {
    openSellModal,
    confirmLoading,
    handleOk,
    handleCancel,
    setOpenSellModal,
  };
};
