import {
  Flex,
  Skeleton,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";

type PlayerInterface = {
  address: string;
  tickets: number;
  totalEth: number;
  chance: number;
};

type PropsPlayersList = {
  players: PlayerInterface[];
};

const PlayersList = (props: PropsPlayersList) => {
  return (
    <Flex w="100%" align="center" mt={12} flexDir="column">
      <Flex>
        <Text
          color="white"
          fontSize="3xl"
          >
          Current&nbsp;
        </Text>
        <Text
          color="green"
          fontSize="3xl"
          >
          Players
        </Text>
      </Flex>
      <Table variant="unstyled" maxW="60%">
        <Thead>
          <Tr
            color="white"
            borderBottomWidth="1px"
            borderBottomColor="lightslategray"
          >
            <Th>Player</Th>
            <Th>Tickets</Th>
            <Th>
              <Flex>
                <Text pr="3px">Total</Text>
                <Text pt="1px">
                  <FaEthereum />
                </Text>
              </Flex>
            </Th>
            <Th>Chance</Th>
          </Tr>
        </Thead>
        <Tbody w="100%">
          {props.players.length === 0 ? (
            <Tr
              color="white"
              borderBottomWidth="1px"
              borderBottomColor="lightslategrey"
              w="100%"
            >
              <Td fontSize="md">
                <Skeleton>000000000000000000000000000000000000</Skeleton>
              </Td>
              <Td fontSize="md" marginLeft="6%">
                <Skeleton> tickets</Skeleton>
              </Td>
              <Td fontSize="md" marginLeft="18%">
                <Skeleton> eth</Skeleton>
              </Td>
              <Td fontSize="md" marginLeft="5%">
                <Skeleton> tickets</Skeleton>{" "}
              </Td>
            </Tr>
          ) : (
            <>
              {props.players.map((player) => {
                return <Player player={player} />;
              })}
            </>
          )}
        </Tbody>
      </Table>
    </Flex>
  );
};

interface Props {
  player: PlayerInterface;
}

const Player = (props: Props) => {
  return (
    <Tr color="white">
      <Td fontSize="md">{props.player.address}</Td>
      <Td fontSize="md" marginLeft="6%">
        {props.player.tickets}
      </Td>
      <Td fontSize="md" marginLeft="18%">
        {props.player.totalEth}
      </Td>
      <Td fontSize="md" marginLeft="5%">
        {props.player.chance}
      </Td>
    </Tr>
  );
};

export default PlayersList;
