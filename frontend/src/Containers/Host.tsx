import { useEffect, useState } from "react";
import RaffleCreator from "../Components/RaffleCreator";
import CoinFlipCreator from "../Components/CoinFlipCreator";
import Messages from "../Components/Messages";
import BaseContainer from "../Components/BaseContainers/BaseContainer";
import { Box } from "@chakra-ui/react"

const Host = () => {
  const [account, setAccount] = useState("");

  useEffect(() => {
    document.title = "Host - Raffle House";
  }, []);

  return (
    <BaseContainer>
      <Box textAlign="center">
        <Messages />
        <Box paddingLeft="10%" width="100%">
          <RaffleCreator />
          <CoinFlipCreator />
        </Box>

        {/* <Footer /> */}
      </Box>
    </BaseContainer>
  );
};

export default Host;
