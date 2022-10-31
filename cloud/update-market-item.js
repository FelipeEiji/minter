Moralis.Cloud.afterSave("MarketItemSoldEvent", async (request) => {
    // logger.info("Request:");
    // logger.info(JSON.stringify(request));
    // logger.info("Request object:");
    // logger.info(JSON.stringify(request.object));
    // logger.info("Request object ItemId:");
    // logger.info(JSON.stringify(request.object.get("itemId")));
    const query = new Moralis.Query("MarketItem");
    const marketItem = await query.equalTo("itemId", request.object.get("itemId")).first();
    logger.info("MarketItem:");
    logger.info(JSON.stringify(marketItem));
});