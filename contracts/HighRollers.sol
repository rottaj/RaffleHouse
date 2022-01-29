pragma solidity ^0.8.11;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./HighRoller.sol";

contract HighRollers is Ownable{
    uint256 private chainLinkFee = 0.1 * 1e18;
    uint256 private ethFee = 0.1 * 1e18;
    uint private timeLimit = 3 minutes;
    IERC20 chainLink;

    event NewGameCreated(address contractAddress);

    constructor(address _chainLinkContractAddress) {
        chainLink = IERC20(_chainLinkContractAddress);
        HighRoller startingGame = new HighRoller();
        currentHighRollerGame = HighRollerGame({ // create starting game ( Will have to manually send eth & Link for now)
            contractAddress: payable(address(startingGame)),
            startTime: block.timestamp,
            endTime: block.timestamp + timeLimit
        });
    }

    struct HighRollerGame {
        address payable contractAddress;
        uint startTime;
        uint endTime;
    }

    HighRollerGame[] public  pastGames;
    
    HighRollerGame public currentHighRollerGame;

    receive() external payable {}

    function processCurrentGame(address _winner) public onlyOwner {  // will be called from API
        if ((currentHighRollerGame.endTime <= block.timestamp) && (_winner != address(0))) { 
            HighRoller newGame = new HighRoller(); // Automatically creates new game every 15 minutes
            createNewHighRollerGame(payable(address(newGame)));
        }
    }

    function createNewHighRollerGame(address payable _contractAddress) public {
        addCurrentGameToPastGames(); // add current game to past games

        currentHighRollerGame = HighRollerGame({ // create new game
            contractAddress: _contractAddress,
            startTime: block.timestamp,
            endTime: block.timestamp + timeLimit
        });
        chainLink.transfer(_contractAddress, chainLinkFee); // send Link to new game
        _contractAddress.transfer(ethFee); // send eth to new game (txn fees)
        emit NewGameCreated(_contractAddress);
    }

    function addCurrentGameToPastGames() public {
        if (currentHighRollerGame.contractAddress != address(0)) { // check if struct is empty ( for initializing )
            pastGames.push(currentHighRollerGame);
        }
    }

    // VIEW FUNCTIONS

    function getCurrentGame() public view returns (HighRollerGame memory) {
        return currentHighRollerGame;
    }

}
