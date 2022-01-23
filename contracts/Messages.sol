pragma solidity ^0.8.11;

contract Messages {
  struct Message {
    address messager;
    string message;
  }

  Message[] public messages;

  function createMessage(string memory _message) public {
    require(msg.sender != address(0), "INVALID SENDER ADDRESS");
    Message memory message = Message ({
      messager: msg.sender,
      message: _message
    });

    messages.push(message);
  }

  function getMessages() public view returns (uint256) {
    return messages.length;
  }

  function getMessageByIndex(uint256 _index) public view returns (Message memory) {
    return messages[_index];
  }
}
