pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract RaffleEscrow is Ownable {
  //address private raffleAddress;
  address payable private creatorAddress;
  bool private allowWithdraw = false; 
  uint256 private timeLimit;
   
  //address private tickets = [];  // [0x02342351, 0x025243123, 0x0234234234, 0x0235234134, 0x235123124]

  constructor(address payable _creatorAddress, uint256 _timeLimit) {
    //raffleAddress = _raffleAddress;
    creatorAddress = _creatorAddress;
    timeLimit = _timeLimit
  }

  mapping (address => uint256) _userDeposits;

  function deposit() payable public {
    require(msg.value != 0, "DEPOSIT: INVALID FUNDS");
    require(msg.sender != address(0), "DEPOSIT: INVALID ADDRESS");
    uint256 amount = msg.value;
    _userDeposits[msg.sender] += msg.value;
    //userTickets = []
    //tickets.push(...userTickets) 
    processProposal()
  }
 
  function withdrawEther(address payable _winner) public onlyOwner{
    require(_winner != address(0), "WITHDRAW: INVALID ADDRESS");
    require(allowWithdraw == true, "WITHDRAW: NOT ALLOWED TO WITHDRAW");
    creatorAddress.send(address(this).balance);  
  }

  function processProposal() private {
    // logic 
    if (block.timestamp >= timeLimit) {
      enableWithdraw()
      
    }
  }

  function enableWithdraw() public onlyOwner {
    allowWithdraw = true; 
  }

  function getBalance() public view { // only for testing
    console.log(address(this).balance / 1 ether);
  }
}
