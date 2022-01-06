pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "hardhat/console.sol";

contract RaffleEscrow is Ownable {
  //address private raffleAddress;
  address payable private creatorAddress;
  bool private allowWithdraw = false; 

  constructor(address payable _creatorAddress) {
    //raffleAddress = _raffleAddress;
    creatorAddress = _creatorAddress;
  }

  mapping (address => uint256) _userDeposits;

  function deposit() payable public {
    require(msg.value != 0, "DEPOSIT: INVALID FUNDS");
    require(msg.sender != address(0), "DEPOSIT: INVALID ADDRESS");
    uint256 amount = msg.value;
    _userDeposits[msg.sender] += msg.value;
  }
 
  function withdrawEther(address payable _winner) public onlyOwner{
    require(_winner != address(0), "WITHDRAW: INVALID ADDRESS");
    require(allowWithdraw == true, "WITHDRAW: NOT ALLOWED TO WITHDRAW");
    creatorAddress.send(address(this).balance);  
  }

  function enableWithdraw() public onlyOwner {
    allowWithdraw = true; 
  }

  function getBalance() public view { // only for testing
    console.log(address(this).balance / 1 ether);
  }
}
