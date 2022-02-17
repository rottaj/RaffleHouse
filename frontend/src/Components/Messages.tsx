import { useState, useEffect } from "react";
import { ethers } from "ethers";
import {
  MessagesAddress,
  _Messages_abi,
} from "../interfaces/Messages_interface";
import { Box, Button, Input, Skeleton, Stack, Text } from "@chakra-ui/react";
import { useContext } from "react";
import { MetaMaskUserContext } from "../utils/contexts";

declare let window: any;
const Messages = () => {
  const [messages, setMessages]: any = useState([]);
  const [isMessagesLoading, setIsMessagesLoading] = useState(true);
  const [message, setMessage] = useState("");

  const { user: myAddress } = useContext(MetaMaskUserContext);

  const getMessages = async () => {
    if (window.ethereum) {
      const tempMessages = [];
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
        tempMessages.push(message);
      }
      setMessages(tempMessages);
      setIsMessagesLoading(false);
    }
  };

  useEffect(() => {
    if (window.ethereum) {
      getMessages();
    }
  }, []);

  const handleSubmit = async (e: any) => {
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const messagesContract = new ethers.Contract(
      MessagesAddress,
      _Messages_abi,
      signer
    ); // connect to Raffles Contract
    await messagesContract.createMessage(message);
  };

  return (
    <Box color="black" fontFamily="Arial, Helvetica, sans-serif" height="100%">
      <Box px="22px" pb="40px">
        {isMessagesLoading ? (
          <Stack>
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
            <Skeleton height="21px" />
          </Stack>
        ) : (
          messages.map((message: any, index: number) => {
            return (
              <Box key={index}>
                <Text fontWeight="bold" fontSize="sm">
                  {message.messager.toLowerCase() === myAddress
                    ? "You" + ": "
                    : message.messager.substring(0, 6) +
                      "..." +
                      message.messager.substring(36, 40) +
                      ": "}
                </Text>
                <Text fontSize="sm">{message.message}</Text>
              </Box>
            );
          })
        )}
      </Box>
      <Box pos="fixed" bottom={0} m={0} p={0}>
        <Input
          sx={{
            background: "white",
            color: "black",
            input: { color: "black" },
          }}
          placeholder="Send message"
          id="filled-basic"
          onChange={(e) => setMessage(e.target.value)}
        ></Input>
        <Button
          isFullWidth
          onClick={() => handleSubmit(message)}
          style={{ maxHeight: "55px" }}
        >
          Send Message
        </Button>
        {/* </form> */}
      </Box>
    </Box>
  );
};

export default Messages;
