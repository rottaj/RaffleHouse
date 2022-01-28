pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";


contract HighRoller { // add VRF

    uint private timeLimit = 15 minutes;
    uint private startTime = block.timestamp;
    address private winner;

    struct GameInfo {
        uint timeLimit;
        uint startTime;
        address winner;
    }

    address[] tickets;

    function deposit(uint256 _tickets, address _accountAddress) public {
        require(msg.sender != address(0), "DEPOSIT: INVALID ADDRESS");
        //_userDeposits[_accountAddress] += _tickets; // If MIN_TICKETS !! REACHED --> REFUND
        for (uint i=0; i<=_tickets; i++) {
            tickets.push(_accountAddress);
        }
    }

    function withDrawNFT(address _collectionAddress, uint256 _tokenID) public {
        IERC721 collection = IERC721(_collectionAddress);
        collection.transferFrom(address(this), winner, _tokenID); // Sends ERC721 Token to Winner
    }

    // VIEW FUNCTIONS 

    function getGameInfo() public view returns (GameInfo memory) {
        GameInfo memory gameInfo = GameInfo({
            timeLimit: timeLimit,
            startTime: startTime,
            winner: winner
        });
        return gameInfo;
    }

}