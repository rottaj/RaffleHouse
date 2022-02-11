import React, { useEffect } from "react";

import "./Home.css";
import BaseContainer from "../Components/BaseContainers/BaseContainer";
import { Flex } from "@chakra-ui/react";
const Home = () => {
  useEffect(() => {
    document.title = "Raffle House";
  }, []);

  return (
    <BaseContainer>
      <Flex w="100%" minH="100vh" h="100%" justify="center" mt="220px">
        <div className="sign">
          <span className="fast-flicker">Raffle House</span>
        </div>
      </Flex>
    </BaseContainer>
  );
};

export default Home;
