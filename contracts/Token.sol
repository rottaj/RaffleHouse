pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
//import "@openzeppelin/contracts/token/ERC721/ERC721Mintable.sol";
//import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
contract Token is ERC721 {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    mapping (uint256 => string) private _tokenURIs;
    constructor() ERC721("TokenLoto", "Loto") {
    }
    function mintToken(address _owner, string memory _tokenURI) private {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(_owner, tokenId);
        _setTokenURI(tokenId, _tokenURI);
    }

    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal virtual {
        require(_exists(_tokenId), "Token does not exist");
        _tokenURIs[_tokenId] = _tokenURI;
    }
}