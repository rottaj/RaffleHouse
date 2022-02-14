import {
    Box,
    Flex,
    Heading
} from "@chakra-ui/react"

type PlayerInterface  = {
    address: string;
    tickets: number;
    totalEth: number;
    chance: number;
}

type PropsPlayersList = {
    players: PlayerInterface[];
}

const PlayersList = (props:PropsPlayersList) => {
    return (
        <Box width="50%">
            <Flex color="white">
                <Heading fontSize="md">Player</Heading>
                <Heading fontSize="md" marginLeft="48%">Tickets</Heading>
                <Heading fontSize="md" marginLeft="13%">Total Eth</Heading>
                <Heading fontSize="md" marginLeft="5%">Chance</Heading>
            </Flex>
            {props.players.map(player => {return <Player player={player}/>})}
        </Box>
    )
}


interface Props {
    player: PlayerInterface;
}

const Player = (props:Props) => {
    return (
        <Flex 
            background="#40434"
            borderRadius="20px"
            color="white"
            marginBottom="1%"
        >
                <Heading fontSize="md" >{props.player.address}</Heading>
                <Heading fontSize="md" marginLeft="6%">{props.player.tickets}</Heading>
                <Heading fontSize="md" marginLeft="18%">{props.player.totalEth}</Heading>
                <Heading fontSize="md" marginLeft="5%">{props.player.chance}</Heading>
        </Flex>
    )
}


export default PlayersList;