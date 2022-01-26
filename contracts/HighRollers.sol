pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract HighRollers is Ownable{
    uint256 private chainLinkFee = 0.1 * 1e18;
    uint private timeLimit = 15 minutes;
    IERC20 chainLink;
    constructor(address _chainLinkContractAddress) {
        chainLink = IERC20(_chainLinkContractAddress);
    }

    struct HighRoller {
        address contractAddress;
        uint timeLimit;
    }

    HighRoller[] public  pastGames;
    
    HighRoller public currentHighRollerGame;

    receive() external payable {}

    function createNewHighRollerGame(address _contractAddress) public {
        addCurrentGameToPastGames(); // add current game to past games

        currentHighRollerGame = HighRoller({ // create new game
            contractAddress: _contractAddress,
            timeLimit: timeLimit
        });
        chainLink.transfer(_contractAddress, chainLinkFee);
    }

    function addCurrentGameToPastGames() public {
        pastGames.push(currentHighRollerGame);
    }

}
