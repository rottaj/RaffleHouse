pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Raffles is Ownable {
  struct Raffle {
    address creatorAddress;
    address contractAddress;
    string tokenImage;
    uint256 minTime;
  }
  Raffle[] public raffles;

  function addRaffle(string memory _tokenImage, address _contractAddress) public {
    require(msg.sender != address(0), "INVALID ADDRESS");
    Raffle memory raffle = Raffle ({
      creatorAddress: msg.sender,
      contractAddress: _contractAddress,
      tokenImage: _tokenImage,
      minTime: block.timestamp // for testing.
    });
    raffles.push(raffle);
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
