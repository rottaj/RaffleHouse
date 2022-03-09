pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract CoinFlips is Ownable {
  
  uint256 private chainLinkFee = 0.1 * 1e18;
  IERC20 chainLink;

  constructor(address _chainLinkAddress) {
    chainLink = IERC20(_chainLinkAddress); 
  }

  struct CoinFlip {
    address creatorAddress;
    address contractAddress;
    uint256 BuyInPrice;
  }
  CoinFlip[] public coinFlips;

  receive() external payable {}

  function addCoinFlip(address _contractAddress, uint256 _buyInPrice) public {
    require(msg.sender != address(0), "INVALID MSG.SENDER");
    require(_contractAddress != address(0), "INVALID CONTRACT ADDRESS");
    CoinFlip memory coinFlip = CoinFlip({
      creatorAddress: msg.sender,
      contractAddress: _contractAddress,
      BuyInPrice: _buyInPrice
    });
    coinFlips.push(coinFlip);
    chainLink.transfer(_contractAddress, chainLinkFee);
  }

  function getCoinFlips() public view returns (uint256) {
    return coinFlips.length;
  }

  function getCoinFlipByIndex(uint256 _index) public view returns (CoinFlip memory) {
    return coinFlips[_index];
  }
}
