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
        currentHighRollerContract = new HighRoller();
        currentHighRollerGame = HighRollerGame({ // create starting game ( Will have to manually send eth & Link for now)
            contractAddress: payable(address(currentHighRollerContract)),
            startTime: block.timestamp,
            endTime: block.timestamp + timeLimit,
            winner: address(0), 
            tickets: 0
        });
    }

    struct HighRollerGame {
        address payable contractAddress;
        uint startTime;
        uint endTime;
        address winner;
        uint256 tickets;
    }

    HighRollerGame[] public  pastGames;
    HighRollerGame public currentHighRollerGame;

    HighRoller public currentHighRollerContract;

    receive() external payable {}

    function processCurrentGame() public onlyOwner {  // will be called from API
        uint256 tickets = currentHighRollerContract.getTickets();
        address winner = currentHighRollerContract.getWinner();
        if (tickets > currentHighRollerGame.tickets) {
            currentHighRollerGame.tickets = tickets;
        }
        if (winner != address(0)) {
            currentHighRollerGame.winner = winner;
        }
        if ( currentHighRollerGame.endTime <= block.timestamp && currentHighRollerGame.winner != address(0) ) {  // Winner picked, game over.. create new game.
            currentHighRollerContract = new HighRoller(); // Automatically creates new game every ( n ) minutes
            createNewHighRollerGame(payable(address(currentHighRollerContract)));
        }
        else if (currentHighRollerGame.endTime <= block.timestamp && currentHighRollerGame.tickets > 0 ) { // Get winner
            currentHighRollerContract.processGame();
        }
        else if (currentHighRollerGame.endTime <= block.timestamp && currentHighRollerGame.tickets == 0) { // Reset Game ( No Tickets )
            currentHighRollerContract.resetGame();
            currentHighRollerGame.startTime = block.timestamp;
            currentHighRollerGame.endTime = block.timestamp + timeLimit;
        }
    }

    function createNewHighRollerGame(address payable _contractAddress) public {
        addCurrentGameToPastGames(); // add current game to past games

        currentHighRollerGame = HighRollerGame({ // create new game
            contractAddress: _contractAddress,
            startTime: block.timestamp,
            endTime: block.timestamp + timeLimit,
            winner: address(0),
            tickets: 0
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

    function getCurrentGame() view external returns (HighRollerGame memory) {
        return currentHighRollerGame;
    }


}
