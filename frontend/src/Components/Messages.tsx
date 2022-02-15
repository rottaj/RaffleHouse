import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  MessagesAddress,
  _Messages_abi,
} from "../interfaces/Messages_interface";
import { Box, Heading } from "@chakra-ui/react";
import { useContext } from "react";
import { MetaMaskUserContext } from "../utils/contexts";

declare let window: any;
const Messages = () => {
  const [messages, setMessages]: any = useState([]);

  const { user: myAddress } = useContext(MetaMaskUserContext);

  const getMessages = async () => {
    if (window.ethereum) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const messagesContract = await new ethers.Contract(
        MessagesAddress,
        _Messages_abi,
        signer
      );
      let messagesLength = await messagesContract.getMessages();
      for (let i = 0; i <= messagesLength - 1; i++) {
        var message: any = {};
        var messageInstance = await messagesContract.getMessageByIndex(i);
        message["messager"] = messageInstance["messager"];
        message["message"] = messageInstance["message"];
        setMessages((messages: any) => [...messages, message]);
      }
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      getMessages();
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const messagesContract = await new ethers.Contract(
      MessagesAddress,
      _Messages_abi,
      signer
    ); // connect to Raffles Contract
    const messageTxn = messagesContract.createMessage(e.target[0].value);
  };

  return (
    <Box
      backgroundColor="#0d0b0"
      zIndex="9000"
      textAlign="center"
      position="fixed"
      width="15%"
      float="right"
      color="white"
      right="10px"
      fontFamily="Arial, Helvetica, sans-serif"
      height="100%"
      overflowY="scroll"
      borderRadius="30px"
      opacity="83%"
    >
      <Heading fontSize="lg">Messages </Heading>
      <Box>
        <Box>
          {messages.map((message: any, index: number) => {
            return (
              <Box key={index}>
                <Heading fontSize="sm">
                  {message.messager === myAddress[myAddress.length - 1]
                    ? "You" + ": "
                    : message.messager.substring(0, 6) +
                      "..." +
                      message.messager.substring(36, 40) +
                      ": "}
                </Heading>
                <Heading fontSize="sm">{message.message}</Heading>
              </Box>
            );
          })}
          <Box height="100%" minHeight="200px">
            <form
              className="CreateMessage-Form"
              onSubmit={(e) => handleSubmit(e)}
            >
              {/* <TextField
                className="Messages-Create-New-Message"
                sx={{
                  background: "white",
                  color: "black",
                  input: { color: "black" },
                }}
                placeholder="Message"
                id="filled-basic"
                label="Write something"
                variant="filled"
              ></TextField> */}
              {/* <Button variant="contained" type="submit" style={{maxHeight: '55px'}}>
                        Send Message
                    </Button> */}
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Messages;
