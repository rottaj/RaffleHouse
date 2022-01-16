pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Raffles is Ownable {

  //address public chainLinkContractAddress;
  uint256 private chainLinkFee = 3;
  IERC20 chainLink; // Maybe change to private
  constructor(address _chainLinkContractAddress) {
    chainLink = IERC20(_chainLinkContractAddress);
  }
  struct Raffle {
    address creatorAddress;
    address contractAddress;
    string tokenImage;
    uint256 minTime;
  }

  Raffle[] public raffles;

  receive() external payable {}

  function addRaffle(string memory _tokenImage, address _contractAddress) public {
    require(msg.sender != address(0), "INVALID ADDRESS");
    Raffle memory raffle = Raffle ({
      creatorAddress: msg.sender,
      contractAddress: _contractAddress,
      tokenImage: _tokenImage,
      minTime: block.timestamp // for testing.
    });

    raffles.push(raffle); // Add raffle to raffles[]
    chainLink.transfer(_contractAddress, chainLinkFee); // transfer LINK to new raffle
  }

  
  function removeRaffleByIndex(uint _index) public onlyOwner {
    delete raffles[_index]; 
  }

  // Views
  function getRaffles() public view returns (uint) {
    return raffles.length;
  }

  function getRaffleByIndex(uint _index) public view returns (Raffle memory) {
    return raffles[_index];
  }
  
}
