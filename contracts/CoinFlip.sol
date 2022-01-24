pragma solidity ^0.8.11;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";

contract CoinFlip is VRFConsumerBase {
  address payable private creatorAddress;
  address payable private joineeAddress;
  address payable private winner;
  uint256 private fee;
  uint256 private BUY_IN_PRICE;
  bytes32 private keyhash;

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
    address joineeAddress;
    address winner;
    uint256 buyInPrice;
  }


  address[2] players;

  function deposit() payable public {
    require(msg.sender != address(0), "INVALID ADDRESS");
    require(msg.value != 0, "INVALID ETHER"); // will update this later
    require(msg.value >= BUY_IN_PRICE, "INVALID BUY IN PRICE");
    //require(players[1] != address(0), "PLAYERS FULL"); // FIX THis
    if (players[0] == address(0)) {
      players[0] = msg.sender;
    } 
    else if (players[1] == address(0)) {
      players[1] = msg.sender;
      joineeAddress = payable(msg.sender);
      getRandomNumber();
    }
  }


  function getRandomNumber() private returns (bytes32 requestId) {
    require(LINK.balanceOf(address(this)) >= fee, "NOT ENOUGH LINK");
    return requestRandomness(keyhash, fee);
  }

  function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
    uint256 valueBetween = (randomness % 2);
    winner = payable(players[valueBetween]);
    withDraw();
    emit WinnerPicked(requestId, valueBetween); // add winner instead of value?
  }

  function withDraw() private {
    uint winnings= address(this).balance;
    require(payable(winner).send(winnings), "FAILED TO SEND TO WINNER");
  }

  function getWinner() public view returns (address) {
    return winner; 
  }

  function getGameInfo() public view returns (GameInfo memory) {
    GameInfo memory gameInfo = GameInfo({
      creatorAddress: creatorAddress,
      joineeAddress: joineeAddress,
      winner: winner,
      buyInPrice: BUY_IN_PRICE
    });
    return gameInfo;
  }

}
