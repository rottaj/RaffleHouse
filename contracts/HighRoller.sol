pragma solidity ^0.8.11;


import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";


contract HighRoller is VRFConsumerBase, Ownable { // add VRF

    uint private timeLimit = 10 minutes; // Change to processing Time
    uint256 minTokens = 5;
    uint private startTime;
    uint private endTime;
    address private winner;
    bytes32 keyhash;
    uint256 private fee;
    State state;

    event WinnerPicked(bytes32 indexed requestId, uint256 indexed result);

    constructor()
        VRFConsumerBase(
            0xb3dCcb4Cf7a26f6cf6B120Cf5A73875B7BBc655B,
            0x01BE23585060835E02B77ef475b0Cc51aA1e0709    
        ) public
    {
        startTime = block.timestamp;
        endTime = block.timestamp + timeLimit;
        keyhash = 0x2ed0feb3e7fd2022120aa84fab1945545a9f2ffc9076fd6156fa96eaff4c1311;
        fee = 0.1 * 10 ** 18;
        state = State.STARTED;
    }

    struct GameInfo {
        uint startTime;
        uint endTime;
        address winner;
        uint256 tickets;
        uint256 tokens;
        uint8 status;
    }

    enum State {STARTED, PROCESSING, PROCESSED}

    address[] private tickets;
    string[] private tokens;

    receive() external payable {}

    function processGame() public {
        if ((endTime <= block.timestamp) && (state == State.STARTED) && (tokens.length >= minTokens)) { // REMOVED FOR TESTING ( WILL ADD BACK LATER )
            getRandomNumber();
        }
    }

    function deposit(uint256 _tickets, address _accountAddress, string memory _tokenURI) public {
        require(msg.sender != address(0), "DEPOSIT: INVALID ADDRESS");
        //_userDeposits[_accountAddress] += _tickets; // If MIN_TICKETS !! REACHED --> REFUND
        tokens.push(_tokenURI);
        for (uint i=0; i<=_tickets; i++) {
            tickets.push(_accountAddress);
        }
    }


    function getRandomNumber() private returns (bytes32 requestId) {
        require(LINK.balanceOf(address(this)) >= fee, "Not enough LINK");         
        state = State.PROCESSING;
        return requestRandomness(keyhash, fee);
    }

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint256 valueBetween = (randomness % tickets.length);
        winner = tickets[valueBetween];
        state = State.PROCESSED;
        emit WinnerPicked(requestId, valueBetween);
    }


    function withDrawNFT(address _collectionAddress, uint256 _tokenID) public {
        IERC721 collection = IERC721(_collectionAddress);
        collection.transferFrom(address(this), winner, _tokenID); // Sends ERC721 Token to Winner
    }


    // VIEW FUNCTIONS 

    function getGameInfo() view public returns (GameInfo memory) {
        GameInfo memory gameInfo = GameInfo({
            startTime: startTime,
            endTime: endTime,
            winner: winner,
            tickets: tickets.length,
            tokens: tokens.length,
            status: uint8(state)
        });
        return gameInfo;
    }

    // Will probably refactor to allow batch returns

    function getTickets() view public returns (address[] memory) {
        return tickets;
    }

    function getTicketByIndex (uint256 _index) public view returns (address) { 
        return tickets[_index];
    }

    function getTokens() view public returns (string[] memory) {
        return tokens;
    }

    function getTokensByIndex (uint256 _index) public view returns (string memory) {
        return tokens[_index];
    }

    function getWinner() view public returns (address) {
        return winner;
    }


}