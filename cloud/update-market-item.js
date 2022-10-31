Moralis.Cloud.afterSave("MarketItemSoldEvent", async (request) => {
    const query = new Moralis.Query("MarketItem");
    const marketItem = await query.equalTo("itemId", request.object.get("itemId")).first();
    marketItem.set("sold", true);
    await marketItem.save();
});