import React, { useContext, useEffect } from "react";
import {
  Avatar,
  Box,
  Flex,
  HStack,
  Image,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from "@chakra-ui/react";
import logo from "../../Logo.svg";
import { Link, useLocation } from "react-router-dom";
import { AppRoutePaths } from "../../utils/constants/routes";
import { MetaMaskUserContext } from "../../utils/contexts";
import { AiOutlineUser } from "react-icons/ai";

type NavLinkProps = {
  text: string;
  href: string;
};

const NavLink = ({ text, href }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;
  return (
    <Link to={href}>
      <Text
        color={isActive ? "lightpink" : "white"}
        _hover={{ color: "lightpink" }}
        fontSize="16px"
        fontFamily="sans-serif"
      >
        {text}
      </Text>
    </Link>
  );
};

const NavBar = () => {
  const { user } = useContext(MetaMaskUserContext);

  return (
    <nav>
      <Box
        w="100%"
        pos="fixed"
        top="0"
        left="0"
        right="0"
        zIndex="sticky"
        bgColor="#1c191c"
        boxShadow="2xl"
        transition="all 0.25s"
      >
        <Box
          h={["66px", null, "86px"]}
          bg="transparent"
          maxW="1440px"
          mx="auto"
          px={["22px", null, "72px"]}
        >
          <Flex h="100%" align="center">
            <HStack w="100%" spacing={20}>
              <Link to={AppRoutePaths.Root}>
                <Box
                  pb={[0, null, 2]}
                  tabIndex={1}
                  _hover={{ cursor: "pointer" }}
                >
                  <Image pt="22px" src={logo} />
                </Box>
              </Link>
              <NavLink href={AppRoutePaths.Raffles} text={"Raffles"} />
              <NavLink href={AppRoutePaths.CoinFlips} text={"Coin Flip"} />
              <NavLink href={AppRoutePaths.HighRollers} text={"High Roller"} />
              <NavLink href={AppRoutePaths.Host} text={"Host"} />
              <Spacer />
              <Menu>
                <MenuButton>
                  <Avatar
                    bg="red.500"
                    icon={<AiOutlineUser fontSize="1.5rem" />}
                  />
                </MenuButton>
                <MenuList maxW={"80px"} zIndex={10}>
                  <MenuItem
                    maxW={"90%"}
                    noOfLines={1}
                    textOverflow={"ellipsis"}
                  >
                    Wallet Address: {user}
                  </MenuItem>
                  <MenuItem>Profile</MenuItem>
                  <MenuItem>Settings</MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </Flex>
        </Box>
      </Box>
    </nav>
  );
};

export default NavBar;
