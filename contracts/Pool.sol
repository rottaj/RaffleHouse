pragma solidity ^0.8.0;

import "@openzeppelin/contracts/ownership/Ownable.sol";
import "./Token.sol";

contract Pool is Ownable{
    enum State {
        LOCKED,
        UNLOCKED
    }

    State public state;
    mapping(address => address) private tokenOwners;
    uint private tokenCount;
    uint private maxTokens;
    address private winnerAddress;

    constructor() {
        state = State.UNLOCKED;
    }

    function createToken() private isUnlocked{

    }

    function currentTokens() private {
        return tokenCount;
    }





    modifier isUnlocked() {
        require(state == State.UNLOCKED, "Pool is locked");
    }

    modifier isLocked() {
        require(state == State.LOCKED, "Pool is unlocked");
    }
}