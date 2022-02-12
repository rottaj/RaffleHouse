import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Center, Flex, Spinner } from "@chakra-ui/react";
import NavBar from "../Nav/NavBar";
import "./BaseContainer";
import { MetaMaskUserContext } from "../../utils/contexts";
import "../../Containers/Home.css";

type BaseContainerProps = {
  showMessages?: boolean;
  children: React.ReactNode;
};

const BaseContainer = ({
  showMessages = false,
  children,
}: BaseContainerProps) => {
  const { user, setUser, isLoadingUser } = useContext(MetaMaskUserContext);
  const [isLoadingConnect, setIsLoadingConnect] = useState(false);

  const getUser = async () => {
    setIsLoadingConnect(true);
    const provider = window.ethereum;
    const accounts = await provider.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setUser(account);
  };

  return (
    <Box>
      {isLoadingUser ? (
        <Center>
          <Spinner />
        </Center>
      ) : !user ? (
        <Box minH="100vh" h="100%" bgColor="#141114">
          <Flex pt="120px" w="100%" h="100%" flexDir="column" align="center">
            <div className="sign">
              <span className="fast-flicker">Raffle House</span>
            </div>

            <Button
              bgColor="#06d6a0"
              _hover={{ bgColor: "#95d5b2" }}
              color="black"
              mt="22px"
              p="8"
              onClick={() => getUser()}
              isLoading={isLoadingConnect}
            >
              Connect metamask account
            </Button>
          </Flex>
        </Box>
      ) : (
        <>
          <NavBar />
          <Box
            minH="100vh"
            pt={["56px", null, "84px"]}
            bgColor="#141114"
          >
            {children}
          </Box>
        </>
      )}
    </Box>
  );
};

export default BaseContainer;
