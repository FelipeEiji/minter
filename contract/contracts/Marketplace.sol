// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/IERC721Metadata.sol";

contract Marketplace is Ownable, ReentrancyGuard {
    using Counters for Counters.Counter;
    Counters.Counter private _itemIds;
    Counters.Counter private _itemsSold;

    struct MarketItem {
        uint256 itemId;
        address nftContract;
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        string name;
        string symbol;
        string tokenURI;
        bool canceled;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;

    event MarketItemCreated(
        uint256 indexed itemId,
        address indexed nftContract,
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        bool sold,
        string name,
        string symbol,
        string tokenURI,
        bool canceled
    );

    event MarketItemSold(uint256 indexed itemId, address owner);

    event MarketItemCanceled(uint256 indexed itemId, address owner);

    function createMarketItem(
        address nftContract,
        uint256 tokenId,
        uint256 price
    ) public nonReentrant {
        require(price > 0, "Marketplace: Price must be greater than 0");

        IERC721(nftContract).transferFrom(msg.sender, address(this), tokenId);
        string memory name = IERC721Metadata(nftContract).name();
        string memory symbol = IERC721Metadata(nftContract).symbol();
        string memory tokenURI = IERC721Metadata(nftContract).tokenURI(tokenId);

        _itemIds.increment();
        uint256 itemId = _itemIds.current();

        idToMarketItem[itemId] = MarketItem(
            itemId,
            nftContract,
            tokenId,
            payable(msg.sender),
            payable(address(0)),
            price,
            false,
            name,
            symbol,
            tokenURI,
            false
        );

        emit MarketItemCreated(
            itemId,
            nftContract,
            tokenId,
            msg.sender,
            address(0),
            price,
            false,
            name,
            symbol,
            tokenURI,
            false
        );
    }

    function createMarketSale(address nftContract, uint256 itemId)
        public
        payable
        nonReentrant
    {
        uint256 price = idToMarketItem[itemId].price;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        bool sold = idToMarketItem[itemId].sold;
        bool canceled = idToMarketItem[itemId].canceled;

        require(canceled != true, "Marketplace: This Sale has been canceled");

        require(
            msg.value == price,
            "Marketplace: Please submit the asking price in order to complete the purchase"
        );
        require(sold != true, "Marketplace: This Sale has already finished");

        idToMarketItem[itemId].seller.transfer(msg.value);
        IERC721(nftContract).transferFrom(address(this), msg.sender, tokenId);
        idToMarketItem[itemId].owner = payable(msg.sender);
        _itemsSold.increment();
        idToMarketItem[itemId].sold = true;

        emit MarketItemSold(itemId, msg.sender);
    }

    function cancelMarketSale(uint256 itemId) public nonReentrant {
        bool sold = idToMarketItem[itemId].sold;
        bool canceled = idToMarketItem[itemId].canceled;

        require(sold != true, "Marketplace: This Sale has already finished");
        require(
            canceled != true,
            "Marketplace: This Sale has been canceled already"
        );
        require(
            msg.sender == idToMarketItem[itemId].seller,
            "Marketplace: You are not the owner of this Sale"
        );

        idToMarketItem[itemId].canceled = true;
        idToMarketItem[itemId].owner = idToMarketItem[itemId].seller;
        uint256 tokenId = idToMarketItem[itemId].tokenId;
        IERC721(idToMarketItem[itemId].nftContract).transferFrom(
            address(this),
            msg.sender,
            tokenId
        );

        emit MarketItemCanceled(itemId, msg.sender);
    }
}
