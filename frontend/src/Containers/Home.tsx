import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import BaseContainer from "./BaseContainers/BaseContainer";
import "../styles/Home/Home.scss";

const Home = () => {
  useEffect(() => {
    document.title = "Raffle House";
  }, []);

  return (
    <BaseContainer>
      <Flex w="100%" h="100%" justify="center" pt="220px">
        <div className="sign">
          <span className="fast-flicker">Raffle House</span>
        </div>
      </Flex>
    </BaseContainer>
  );
};

export default Home;
