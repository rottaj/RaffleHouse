pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./HighRoller.sol";

contract HighRollers is Ownable{
    uint256 private chainLinkFee = 0.1 * 1e18;
    uint private timeLimit = 15 minutes;
    IERC20 chainLink;
    constructor(address _chainLinkContractAddress) {
        chainLink = IERC20(_chainLinkContractAddress);
        HighRoller startingGame = new HighRoller();
        currentHighRollerGame = HighRollerGame({ // INITIALIZE STARTING GAME
            contractAddress: address(startingGame),
            timeLimit: timeLimit,
            startTime: block.timestamp
        });
    }

    struct HighRollerGame {
        address contractAddress;
        uint timeLimit;
        uint startTime;
    }

    HighRollerGame[] public  pastGames;
    
    HighRollerGame public currentHighRollerGame;

    receive() external payable {}

    function processCurrentGame() public { 
        if (currentHighRollerGame.timeLimit + currentHighRollerGame.startTime >= block.timestamp) { 
            HighRoller newGame = new HighRoller(); // Automatically creates new game every 15 minutes
            createNewHighRollerGame(address(newGame));
        }
    }

    function createNewHighRollerGame(address _contractAddress) public {
        addCurrentGameToPastGames(); // add current game to past games

        currentHighRollerGame = HighRollerGame({ // create new game
            contractAddress: _contractAddress,
            timeLimit: timeLimit,
            startTime: block.timestamp
        });
        chainLink.transfer(_contractAddress, chainLinkFee);
    }

    function addCurrentGameToPastGames() public {
        pastGames.push(currentHighRollerGame);
    }

    // VIEW FUNCTIONS

    function getCurrentGame() public view returns (HighRollerGame memory) {
        return currentHighRollerGame;
    }

}
