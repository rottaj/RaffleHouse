pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract RaffleEscrow is VRFConsumerBase {
  //address private raffleAddress;
  //uint256 private timeLimit;
  address payable private creatorAddress;
  bool private allowWithdraw = false; 
  uint256 private BUY_IN_PRICE;
  uint256 private MIN_TICKETS;
  string private tokenURI;
  string private collectionName;
  uint256 private tokenID;
  address private winner;
  uint256 private fee;
  bytes32 keyhash;

  IERC721 collection;
   
  //address private tickets = [];  // [0x02342351, 0x025243123, 0x0234234234, 0x0235234134, 0x235123124]

  event WinnerPicked(bytes32 indexed requestId, uint256 indexed result);

  constructor(
              uint256 _buyInPrice,
              uint256 _minTickets,
              string memory _tokenURI,
              address _collectionAddress,
              string memory _collectionName,
              uint256 _tokenID
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
    creatorAddress = payable(msg.sender);
    BUY_IN_PRICE = _buyInPrice;
    MIN_TICKETS = _minTickets;
    tokenURI = _tokenURI;
    collectionName = _collectionName;
    tokenID = _tokenID;

    keyhash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
    fee = 0.1 * 10 ** 18;

    collection = IERC721(_collectionAddress);
  }

  struct GameInfo {
    address creatorAddress;
    uint256 buyInPrice;
    address winner;
    string tokenURI;
    string collectionName;
    uint256 tokenID;
  }

  address[] tickets;

  modifier readyForProcessing { // maybe we don't want this... what if raffle doesn't reach MIN_TICKETS? we would want to refund then
    require(tickets.length >= MIN_TICKETS, "NOT ENOUGH TICKETS");
  _;
  }

  mapping (address => uint256) _userDeposits;

  function deposit(uint256 _tickets) payable public {
    require(msg.value != 0, "DEPOSIT: INVALID FUNDS"); // Will update this later
    require(msg.sender != address(0), "DEPOSIT: INVALID ADDRESS");
    _userDeposits[msg.sender] += _tickets; // If MIN_TICKETS !! REACHED --> REFUND
    for (uint i=0; i<=_tickets; i++) {
      tickets.push(msg.sender);
    }

    if (tickets.length >= MIN_TICKETS) { // JUST FOR TESTING CHANGE THIS
      processRaffle();
    }
  }

  function processRaffle() private readyForProcessing { // FOR TESTING --> MIN_TICKETS
    getRandomNumber();
  }


  function getRandomNumber() private returns (bytes32 requestId) {
    require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");         
    return requestRandomness(keyhash, fee);
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    uint256 valueBetween = (randomness % tickets.length) + 1;
    winner = tickets[valueBetween];

    collection.transferFrom(address(this), winner, tokenID); // Sends ERC721 Token to Winner
    withdrawEther(); // Sends Balance to Raffle Creator 
    emit WinnerPicked(requestId, valueBetween); // add winner instead of value?
  }
 
  function withdrawEther() private {
    //require(allowWithdraw == true, "WITHDRAW: NOT ALLOWED TO WITHDRAW"); // WILL ADD THIS LATER!
    creatorAddress.send(address(this).balance);  
  }
  

  // VIEW FUNCTIONS

  function getUserDeposit(address _player) public view returns (uint256) {
    return _userDeposits[_player]; 
  }

  function getTickets() public view returns (address[] memory) {
    return tickets;
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

  function getGameInfo() public view returns (GameInfo memory) {
    GameInfo memory gameInfo = GameInfo({
      creatorAddress: creatorAddress,
      buyInPrice: BUY_IN_PRICE,
      winner: winner,
      tokenURI: tokenURI,
      collectionName: collectionName,
      tokenID: tokenID
    });
    return gameInfo;
  }

}
