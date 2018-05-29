pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyOwnToken is ERC721Token {
    //Mapping from tokenId to tokenPrice
    mapping (uint256 => uint256) internal tokenPrice;

    //implement event for setTokenURI

    constructor() public ERC721Token("MyOwnToken", "MOT") {}

    function mint(uint256 _tokenPrice) external {
        uint256 tokenId = allTokens.length;
        super._mint(msg.sender, tokenId);
        tokenPrice[tokenId] = _tokenPrice;
    }

    function setTokenUri(uint256 _tokenId, string _uri) external onlyOwnerOf(_tokenId) {
        super._setTokenURI(_tokenId, _uri);
        //fire some event
    }

    function buyToken(uint256 _tokenId, bytes _data) external payable {
        //first requirement might be included in safeTransferFrom
        require(tokenOwner[_tokenId] != address(0));
        require(msg.value >= tokenPrice[_tokenId]);
        safeTransferFrom(tokenOwner[_tokenId], msg.sender, _tokenId, _data);
        super._burn(msg.sender, _tokenId);
    }

    function burn(uint256 _tokenId) external {
        super._burn(msg.sender, _tokenId);
    } 
}