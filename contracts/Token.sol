pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/Owner.sol";
contract Token is ERC721, Ownable{
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    address payable treasury;
    mapping (uint256 => string) private _tokenURIs; // Token ID to URI
    mapping (address => uint256) private _owners;

    constructor() ERC721("TokenLoto", "Loto") {
    }

    function requestToken() public payable {
        require(msg.value >= 0.03 ether, "Not enough ether");
        _mintToken(msg.sender);
    }

    function _mintToken(address _owner, string memory _tokenURI) private onlyOwner {
        _tokenIds.increment();
        uint256 tokenId = _tokenIds.current();
        _mint(_owner, tokenId);
        //_setTokenURI(tokenId, _tokenURI);
        _owners[_owner] = tokenId;
    }


    function _setTokenURI(uint256 _tokenId, string memory _tokenURI) internal virtual {
        require(_exists(_tokenId), "Token does not exist");
        _tokenURIs[_tokenId] = _tokenURI;
    }
}