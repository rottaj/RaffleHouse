import { MetaMaskUserContext } from "../utils/contexts";
import { useContext } from 'react';
import {
    Box,
    Flex,
    Text,
    Heading,
    Image
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
const NetworkAndUser = () => {

    const { user, userProfile } = useContext(MetaMaskUserContext);

    return (
        <Box
            pos="fixed"
            top="20px"
            right="400px"
            w="40px"
            h="40px"
            zIndex={1200}
        >
            <Flex>

                <Flex pt={1} mx={10}>
                    <Box pt={0.2} pr={1}>
                        <FaEthereum size={25} color='purple'/>
                    </Box>
                    {window.ethereum.networkVersion == '4' &&
                        <Heading fontSize={20} color="white">Rinkeby</Heading>
                    }
                    {window.ethereum.networkVersion == '1' &&
                        <Heading fontSize={20} color="white">Ethereum</Heading>
                    }
                    {window.ethereum.networkVersion == '3' &&
                        <Heading fontSize={20} color="white">Ropsten</Heading>
                    }
                    {window.ethereum.networkVersion == '5' &&
                        <Heading fontSize={20} color="white">Goerli</Heading>
                    }
                    {window.ethereum.networkVersion == '42' &&
                        <Heading fontSize={20} color="white">Kovan</Heading>
                    }

                </Flex>
                <Flex>
                    <Image maxWidth={30} maxHeight={30} borderRadius="20px" src={userProfile.profileImage}/>
                    <Heading pl={1} pt={1} color="white" fontSize={20} >{user.substr(0, 8)}...</Heading>
                </Flex>

            </Flex>
        </Box>
    )
}

export default NetworkAndUser;