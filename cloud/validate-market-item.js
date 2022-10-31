Moralis.Cloud.beforeSave("MarketItem", async (request) => {
    const query = new Moralis.Query("MarketItem");
    const marketItem = await query.equalTo("itemId", request.object.get("itemId")).first();

    logger.info("Criando!");
    logger.info("Objeto:");
    logger.info(JSON.stringify(marketItem));
    if(marketItem){
        logger.error("Item ja criado");
        return;
    }

    logger.info("Criado!");

    return request.object;
  });