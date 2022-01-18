pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "hardhat/console.sol";

contract RaffleEscrow is VRFConsumerBase {
  //address private raffleAddress;
  //uint256 private timeLimit;
  address payable private creatorAddress;
  bool private allowWithdraw = false; 
  uint256 public MIN_DEPOSIT;
  string public tokenURI;
  address public winner;
  uint256 internal fee;
  bytes32 keyhash;
   
  //address private tickets = [];  // [0x02342351, 0x025243123, 0x0234234234, 0x0235234134, 0x235123124]

  event WinnerPicked(bytes32 indexed requestId, uint256 indexed result);

  constructor(address payable _creatorAddress,
              uint256 _minDeposit,
              string memory _tokenURI
              )
              //address _vrfCoordinator,
              //address _link,
              //bytes32 _keyhash,
              //uint _fee)
      VRFConsumerBase(
        0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B,
        0x01BE23585060835E02B77ef475b0Cc51aA1e0709
      ) public
  {
    creatorAddress = _creatorAddress;
    MIN_DEPOSIT = _minDeposit;
    tokenURI = _tokenURI;
    keyhash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
    fee = 0.1 * 10 ** 18;
  }

  address[] tickets;

  mapping (address => uint256) _userDeposits;

  function deposit(uint256 _tickets) payable public {
    require(msg.value != 0, "DEPOSIT: INVALID FUNDS");
    require(msg.sender != address(0), "DEPOSIT: INVALID ADDRESS");
    uint256 amount = msg.value;
    _userDeposits[msg.sender] += msg.value;
    for (uint i=0; i<=_tickets; i++) {
      tickets.push(msg.sender);
    }

  }

  function getRandomNumber() public returns (bytes32 requestId) {
    require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");         
    return requestRandomness(keyhash, fee);
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    uint256 valueBetween = (randomness % 20) + 1;
    //winner = tickets[valueBetween];
    emit WinnerPicked(requestId, valueBetween); // add winner instead of value?
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

  function getTickets() public view returns (uint256) {
    return tickets.length;
  }

  function getTicketByIndex (uint256 _index) public view returns (address) {
    return tickets[_index];
  }

  function getBalance() public view returns (uint) { // only for testing
    return address(this).balance / 1 ether;
  }
  
  function getWinner() public view returns (address) {
    return winner;
  }

}
