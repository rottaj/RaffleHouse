pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";


contract Raffles is Ownable {

  //address public chainLinkContractAddress;
  uint256 private chainLinkFee = 0.1 * 1e18;
  IERC20 chainLink; // Maybe change to private
  constructor(address _chainLinkContractAddress) {
    chainLink = IERC20(_chainLinkContractAddress);
  }
  struct Raffle {
    address creatorAddress;
    address contractAddress;
    address collectionAddress;
    string collectionName;
    uint256 tokenID;
    uint256 minTime;
  }

  Raffle[] public raffles;

  receive() external payable {}

  function addRaffle(address _contractAddress, address _collectionAddress, string memory _collectionName, uint256 _tokenID) public {
    require(msg.sender != address(0), "INVALID ADDRESS");
    Raffle memory raffle = Raffle ({
      creatorAddress: msg.sender,
      contractAddress: _contractAddress,
      collectionAddress: _collectionAddress,
      collectionName: _collectionName,
      tokenID: _tokenID,
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
