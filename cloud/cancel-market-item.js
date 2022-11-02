Moralis.Cloud.afterSave("MarketItemCanceledEvent", async (request) => {
    const query = new Moralis.Query("MarketItem");
    const marketItem = await query.equalTo("itemId", request.object.get("itemId")).first();
    marketItem.set("canceled", true);
    await marketItem.save();
});