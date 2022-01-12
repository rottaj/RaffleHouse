pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Raffles is Ownable {
  struct Raffle {
    address creatorAddress;
    uint256 minTime;
  }
  Raffle[] public raffles;

  function getRaffles() public view returns (uint) {
    return raffles.length;
  }

  function getRaffleByIndex(uint _index) public view returns (Raffle memory) {
    return raffles[_index];
  }

  function removeRaffleByIndex(uint _index) public onlyOwner {
    delete raffles[_index]; 
  }
  
}
