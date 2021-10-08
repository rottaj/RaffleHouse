pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";
import "./Token.sol";

contract Pool is Ownable{
    enum State {
        LOCKED,
        UNLOCKED
    }

    State public state;
    mapping(address => address) private tokenOwners; // Token address to owner address.
    uint private tokenCount; // returns current token count
    uint private maxTokens; // max number of tokens for pool
    address private winnerAddress; // winning address.
    address private tokenAddress;

    constructor() { // initialize pool
        state = State.UNLOCKED; // set state to unlocked
    }


    function currentTokens() private view returns(uint){ // return current token count
        return tokenCount;
    }



    modifier isUnlocked() {
        require(state == State.UNLOCKED, "Pool is locked");
        _;
    }

    modifier isLocked() {
        require(state == State.LOCKED, "Pool is unlocked");
        _;
    }
}