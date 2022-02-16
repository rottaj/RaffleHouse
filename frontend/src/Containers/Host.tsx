import { useEffect, useState } from "react";
import RaffleCreator from "../Components/RaffleCreator";
import CoinFlipCreator from "../Components/CoinFlipCreator";
import Messages from "../Components/Messages";
import BaseContainer from "./BaseContainers/BaseContainer";
import { Box, Flex } from "@chakra-ui/react";

const Host = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    document.title = "Host - Raffle House";
  }, []);

  return (
    <BaseContainer>
      <Box textAlign="center" w="100%">
        <Messages />
        <Flex align="center" flexDir="column" w="100%" pt="40px">
          <RaffleCreator />
          <CoinFlipCreator />
        </Flex>

        {/* <Footer /> */}
      </Box>
    </BaseContainer>
  );
};

export default Host;
