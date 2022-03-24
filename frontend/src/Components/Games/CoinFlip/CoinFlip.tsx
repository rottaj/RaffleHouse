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
  Spinner
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
            view={props.view}
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
              view={props.view}
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
        onClick={onOpen}
        _hover={{ border: "1.5px solid green" }}
      >
      <CoinFlipViewer
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        gameInfo={props.coinFlip}
        creatorImage={creatorImage}
        joineeImage={joineeImage}
      />
        {props.coinFlip.winner !==
          "0" ? (
          <>
            <Td width="50%">
            <CoinFlipUser
              address={props.coinFlip.creatorAddress as string}
              isBull={true}
              buyInPrice={props.coinFlip.buyInPrice}
              ethusd={parseFloat(networkStats?.ethusd)}
              view={props.view}
            />
            </Td>
            <Td>
            <CoinFlipUser
              address={props.coinFlip.winner as string}
              isBull={true}
              buyInPrice={props.coinFlip.buyInPrice}
              ethusd={parseFloat(networkStats?.ethusd)}
              view={props.view}
            />
            </Td> 
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
          null ? (
            <>
              <Td width="50%">
              <CoinFlipUser
                address={props.coinFlip.creatorAddress as string}
                isBull={true}
                buyInPrice={props.coinFlip.buyInPrice}
                ethusd={parseFloat(networkStats?.ethusd)}
                view={props.view}
              />
              </Td>
              <Td pl="3.5%">
                <Spinner size="md"/>
              </Td>
              <Td pl='18%'>
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
              <Td width="50%">
              <CoinFlipUser
                address={props.coinFlip.creatorAddress as string}
                isBull={true}
                buyInPrice={props.coinFlip.buyInPrice}
                ethusd={parseFloat(networkStats?.ethusd)}
                view={props.view}
              />
              </Td>
              <Td color="green">Joinable</Td>
              <Td pl="18%">
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
