pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract RaffleEscrow {
  //address private raffleAddress;
  //uint256 private timeLimit;
  address payable private creatorAddress;
  bool private allowWithdraw = false; 
  uint256 public MIN_DEPOSIT;
  string public tokenURI;
   
  //address private tickets = [];  // [0x02342351, 0x025243123, 0x0234234234, 0x0235234134, 0x235123124]

  constructor(address payable _creatorAddress, uint256 _minDeposit, string memory _tokenURI) {
    creatorAddress = _creatorAddress;
    MIN_DEPOSIT = _minDeposit;
    tokenURI = _tokenURI;
  }

  mapping (address => uint256) _userDeposits;

  function deposit() payable public {
    require(msg.value != 0, "DEPOSIT: INVALID FUNDS");
    require(msg.sender != address(0), "DEPOSIT: INVALID ADDRESS");
    uint256 amount = msg.value;
    _userDeposits[msg.sender] += msg.value;
    //userTickets = []
    //tickets.push(...userTickets) 
    //processProposal()
  }
 
  function withdrawEther() public {
    require(allowWithdraw == true, "WITHDRAW: NOT ALLOWED TO WITHDRAW");
    creatorAddress.send(address(this).balance);  
  }

  /*
  function processProposal() private {
    // logic 
  }

  function enableWithdraw() private {
    allowWithdraw = true; 
  }
  */

  function getBalance() public view { // only for testing
    console.log(address(this).balance / 1 ether);
  }
}
