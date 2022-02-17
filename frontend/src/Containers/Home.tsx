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
      <Flex w="100%" h="100%" justify="center" pt="220px" background-image="radial-gradient( circle farthest-corner at 10% 20%,  rgba(90,92,106,1) 0%, rgba(32,45,58,1) 81.3% )">
        <div className="sign">
          <span className="fast-flicker">Raffle House</span>
        </div>
      </Flex>
    </BaseContainer>
  );
};

export default Home;

