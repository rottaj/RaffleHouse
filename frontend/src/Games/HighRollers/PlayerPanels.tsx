import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Spacer,
  Stack,
  Text,
  WrapItem,
} from "@chakra-ui/react";
import React from "react";
import { FaEthereum } from "react-icons/fa";

const colorScheme = [
  "#FF8A00",
  "#FBFF38",
  "#FF3838",
  "#38FFE7",
  "#7902D7",
  "#0217D7",
];

const Player = ({ name, index, numTokens, totalValue }) => {
  return (
    <Box
      borderRadius="20px"
      h="103px"
      maxW="480px"
      w="100%"
      px="22px"
      bgGradient={`linear(to-r,${
        colorScheme[index % colorScheme.length]
      }, #000000 70%)`}
    >
      <Flex h="100%">
        <Flex align="center">
          <WrapItem pr="8px">
            <Avatar size="lg">
              <AvatarBadge boxSize="1.25em" bg="green.500" />
            </Avatar>
          </WrapItem>
          <Text fontSize="18px" fontWeight="bold">
            {name}
          </Text>
        </Flex>
        <Spacer />

        <Flex flexDir="column" pt="15px" pb="30px" h="100%">
          <Text>Deposited {numTokens} NFTS</Text>
          <Spacer />
          <Flex align="center">
            <Text>Total Value: {totalValue}</Text>
            <FaEthereum />
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

const PlayerPanels = ({ players }) => {
  // TODO replace name with call to db for name otherwise add address with ellipsis
  return (
    <Stack direction="column" spacing="13px" minW="420px" w="100%">
      {players.map((player, index) => (
        <Player
          index={index}
          name="blake.eth"
          numTokens={player.numTokens}
          totalValue={player.totalEth}
        />
      ))}
    </Stack>
  );
};

export default PlayerPanels;
