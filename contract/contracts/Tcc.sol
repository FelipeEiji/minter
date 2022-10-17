//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "hardhat/console.sol";

contract Tcc is ERC721 {
    struct Token { 
        uint256 id;
        string tokenURI;
    }

    uint256 public tokenCounter;
    mapping(uint256 => string) private _tokenURIs;
    mapping(address => Token[]) private _tokenURIsByAddress;


    constructor(string memory name, string memory symbol) ERC721(name, symbol) {
        console.log("Deploying a Tcc with name:", name, "and symbol:", symbol);
        tokenCounter = 0;
    }

    function mint(string memory _tokenURI) public {
        _safeMint(msg.sender, tokenCounter);
        _setTokenURI(msg.sender, tokenCounter, _tokenURI);

        tokenCounter++;
    }

    function _setTokenURI(address _address, uint256 _tokenId, string memory _tokenURI)
        internal
        virtual
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        ); // Checks if the tokenId exists
        
        Token memory token = Token(_tokenId, _tokenURI);

        _tokenURIs[_tokenId] = _tokenURI;
        _tokenURIsByAddress[_address].push(token);
    }

    function tokenURI(uint256 _tokenId)
        public
        view
        virtual
        override
        returns (string memory)
    {
        require(
            _exists(_tokenId),
            "ERC721Metadata: URI set of nonexistent token"
        );
        return _tokenURIs[_tokenId];
    }

    function listNfts()
        public
        view
        virtual
        returns (Token[] memory)
    {
        for (uint256 i = 0; i < _tokenURIsByAddress[msg.sender].length; i++) {
            Token memory token = _tokenURIsByAddress[msg.sender][i];
            console.log("Token:", token.id, "URI:", token.tokenURI);
        }

        console.log('msg.sender:', msg.sender);
         
        return _tokenURIsByAddress[msg.sender];
    }
}
