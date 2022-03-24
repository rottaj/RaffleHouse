import { useState, useEffect, useContext } from "react";
//import { Redirect, Link, useHistory } from "react-router-dom";

import CoinFlipViewer from "./CoinFlipViewer";
import { _CoinFlips_abi } from "../../../interfaces/CoinFlips_Interface";
import {
  _CoinFlip_abi,
  _CoinFlip_bytecode,
} from "../../../interfaces/CoinFlip_Interface";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { 
  Box,
  Flex, 
  Button, 
  Text, 
  useDisclosure,
  Td,
  Tr,

} from "@chakra-ui/react";
import { MetaMaskUserContext } from "../../../utils/contexts";
import CoinFlipUser from "./CoinFlipUser";
import { FaEthereum } from "react-icons/fa";
interface Props {
  coinFlip: any;
  view: string;
}

const CoinFlip = (props: Props) => {
  //const history = useHistory();
  const { networkStats } = useContext(MetaMaskUserContext);
  const storage = getStorage();
  const [creatorImage, setCreatorImage] = useState("");
  const [joineeImage, setJoineeImage] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
    {props.view == "Card" &&
    <Box
      // py="0.5%"
      // px="0.5%"
      borderRadius="20px"
      fontSize="13px"
      minWidth="300px"
      w="100%"
      border="1px solid white"
      cursor="pointer"
      _hover={{ border: "3px solid green" }}
      onClick={onOpen}
    >
      <CoinFlipViewer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        gameInfo={props.coinFlip}
        creatorImage={creatorImage}
        joineeImage={joineeImage}
      />
      <Flex align="center">
        <>
          <CoinFlipUser
            address={props.coinFlip.creatorAddress as string}
            isBull={true}
            buyInPrice={props.coinFlip.buyInPrice}
            ethusd={parseFloat(networkStats?.ethusd)}
          />
          <Flex
            bgColor="white"
            height="40px"
            width="40px"
            mx="4px"
            justify="center"
            align="center"
          >
            <Text color="black" fontWeight="bold" fontSize="14px">
              VS
            </Text>
          </Flex>

          {props.coinFlip.joineeAddress !== null ? (
            <CoinFlipUser
              address={props.coinFlip.joineeAddress as string}
              buyInPrice={props.coinFlip.buyInPrice}
              ethusd={parseFloat(networkStats?.ethusd)}
            />
          ) : (
            <Box>
              <Button
                _hover={{ bgColor: "lightgreen" }}
                mt="60%"
                color="green"
                fontSize="20px"
              >
                Join Game
              </Button>
            </Box>
          )}
        </>
      </Flex>
    </Box>
    }
    {props.view == "Table" && 
      <Tr
        fontSize="13px"
        width="100%"
        cursor="pointer"
        _hover={{ bgColor: "green" }}
      >
        {props.coinFlip.winner !==
          "0x0000000000000000000000000000000000000000" ? (
          <>
          <Td>{props.coinFlip.creatorAddress.split(20)}</Td>
            <Td>{props.coinFlip.winner.split(20)}</Td>
            <Td>
              <Flex>
                {props.coinFlip.buyInPrice}
                <Box pl="3px" pt="3px">
                  <FaEthereum />
                </Box>
              </Flex>
          </Td>
        </>
      ) : (
        <>
          {props.coinFlip.joineeAddress !==
          "0x0000000000000000000000000000000000000000" ? (
            <>
              <Td>{props.coinFlip.creatorAddress.split(20)}</Td>
              <Td>In Progress</Td>
              <Td>
                <Flex>
                  {props.coinFlip.buyInPrice}{" "}
                  <Box pl="3px" pt="3px">
                    <FaEthereum />
                  </Box>
                </Flex>
              </Td>
            </>
          ) : (
            <>
              <Td>{props.coinFlip.creatorAddress.split(20)}</Td>
              <Td color="green">Joinable</Td>
              <Td>
                <Flex>
                  {props.coinFlip.buyInPrice}{" "}
                  <Box pl="3px" pt="3px">
                    <FaEthereum />
                  </Box>
                </Flex>
              </Td>
            </>
          )}
        </>
        )}
        </Tr>
    }
    </>
  );
};

export default CoinFlip;
