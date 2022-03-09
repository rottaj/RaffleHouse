import React, { useContext, useState } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  IconButton,
  Spinner,
  useDisclosure,
  Heading
} from "@chakra-ui/react";
import { Sidebar } from "../../Components/Nav/Sidebar";
import "./BaseContainer";
import {
  BaseContainerContext,
  MetaMaskUserContext,
} from "../../utils/contexts";
import "../../styles/Home/Home.scss";
import DrawerComponent from "../../Components/Nav/MessagesSidebar";
import NetworkAndUser from "../../Components/NetworkAndUser";
import { FiMinimize } from "react-icons/fi";
import { AiOutlineExpand } from "react-icons/ai";
type BaseContainerProps = {
  showMessages?: boolean;
  children: React.ReactNode;
};

const BaseContainer = ({
  showMessages = true,
  children,
}: BaseContainerProps) => {
  const { user, setUser, isLoadingUser, setIsLoadingUser } =
    useContext(MetaMaskUserContext);
  const [isLoadingConnect, setIsLoadingConnect] = useState(false);

  const getUser = async () => {
    setIsLoadingConnect(true);
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    const account = accounts[0];
    setUser(account);
    setIsLoadingUser(false);
  };

  const { isOpen, onToggle } = useDisclosure({ defaultIsOpen: true });

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
        <Box bgColor="#141114">
          {showMessages && <DrawerComponent />}

          <Box pos="fixed" left={0} zIndex={9000}>
            <IconButton
              aria-label="toggle sidebar"
              p={0}
              bgColor="transparent"
              color="white"
              onClick={onToggle}
              _hover={{ bgColor: "transparent", color: "green" }}
              _active={{ bgColor: "transparent" }}
              icon={
                isOpen ? (
                  <FiMinimize size="22px" />
                ) : (
                  <AiOutlineExpand size="22px" />
                )
              }
            />
          </Box>

          <NetworkAndUser />

          {isOpen && <Sidebar />}
          <BaseContainerContext.Provider value={{ isSidebarOpen: isOpen }}>
            <Box
              minH="100vh"
              maxW="1440px"
              marginLeft="auto"
              marginRight="auto"
              pt={["56px", null, "84px"]}
            >
              {children}
            </Box>
          </BaseContainerContext.Provider>

          <Box>
            <Flex justify="center">
              <Heading color="white">Follow @rafflehouse on Twitter for the latest news</Heading>
            </Flex>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default BaseContainer;

