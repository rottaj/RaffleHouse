pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";


contract HighRoller { // add VRF

    uint private timeLimit = 15 minutes;
    uint private startTime = block.timestamp;

    struct GameInfo {
        uint timeLimit;
        uint startTime;
    }

    function getGameInfo() public view returns (GameInfo memory) {
        GameInfo memory gameInfo = GameInfo({
            timeLimit: timeLimit,
            startTime: startTime
        });
        return gameInfo;
    }

}