pragma solidity ^0.8.11;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract CoinFlip is VRFConsumerBase {
  address payable private creatorAddress;
  address payable private joineeAddress;
  address public winner;
  uint256 internal fee;
  uint256 public BUY_IN_PRICE;
  bytes32 keyhash;

  event WinnerPicked(bytes32 requestId, uint256 valueBetween);

  constructor(
    uint256 _buyInPrice
  )
    VRFConsumerBase(
      0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B,
      0x01BE23585060835E02B77ef475b0Cc51aA1e0709
    ) public
  {
    creatorAddress = payable(msg.sender); 
    BUY_IN_PRICE = _buyInPrice;
    keyhash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
    fee = 0.1 * 10 ** 18;
  }

  struct GameInfo {
    address creatorAddress;
    uint256 buyInPrice;
  }



  address[] tickets;

  function deposit(uint256 _tickets) payable public {
    require(msg.sender != address(0), "INVALID ADDRESS");
    require(msg.value != 0, "INVALID ETHER"); // will update this later
    require(msg.value >= BUY_IN_PRICE, "INVALID BUY IN PRICE");
    for (uint i=0; i<=_tickets; i++) {
      tickets.push(msg.sender);
    }
  }

  function getRandomNumber() public returns (bytes32 requestId) {
    require(LINK.balanceOf(address(this)) >= fee, "NOT ENOUGH LINK");
    return requestRandomness(keyhash, fee);
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    uint256 valueBetween = (randomness % tickets.length) + 1;
    winner = tickets[valueBetween];
    emit WinnerPicked(requestId, valueBetween); // add winner instead of value?
  }

  function getWinner() public view returns (address) {
    return winner; 
  }

  function getGameInfo() public view returns (GameInfo memory) {
    GameInfo memory gameInfo = GameInfo({
      creatorAddress: creatorAddress,
      buyInPrice: BUY_IN_PRICE
    });
    return gameInfo;
  }

}
