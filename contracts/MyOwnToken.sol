pragma solidity ^0.4.23;

import "openzeppelin-solidity/contracts/token/ERC721/ERC721Token.sol";

contract MyOwnToken is ERC721Token {
    //Mapping from tokenId to tokenPrice
    mapping (uint256 => uint256) internal tokenPrice;

    //eventを追加したい

    constructor() public ERC721Token("MyOwnToken", "MOT") {}

    function mint(uint256 _tokenPrice) external {
        uint256 tokenId = allToken.length;
        super._mint(msg.sender, tokenId);
        tokenPrice[_tokenId] = _tokenPrice;
    }

    function setTokenUri(uint256 _tokenId, string _uri) external onlyOwnerOf(_tokenId) {
        super._setTokenUri(_tokenId, _uri);
        //eventをfire
    }

    function buyToken(uint256 _tokenId, bytes _data) external payable {
        //safeTransferFromに含まれているかも
        require(tokenOwner[_tokenId] != address(0));
        require(msg.value >= tokenPrice[_tokenId]);
        safeTransferFrom(tokenOwner[_tokenId], msg.sender, _tokenId, data);
        super._burn(msg.sender, _tokenId);
    }

    function burn(uint256 _tokenId) external {
        super._burn(msg.sender, _tokenId);
    } 
}