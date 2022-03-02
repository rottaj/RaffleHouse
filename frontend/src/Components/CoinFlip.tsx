import { useState, useEffect, useContext } from "react";
//import { Redirect, Link, useHistory } from "react-router-dom";
import CoinBull from "../images/coinBull.png";
import CoinBear from "../images/coinBear.png";
import CoinFlipViewer from "../Containers/CoinFlipViewer";
import {
  _CoinFlips_abi,
} from "../interfaces/CoinFlips_Interface";
import {
  _CoinFlip_abi,
  _CoinFlip_bytecode,
} from "../interfaces/CoinFlip_Interface";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Box,
  Flex,
  Image,
  Heading,

  useDisclosure,


} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";



interface Props {
  coinFlip: any;
}



const CoinFlip = (props: Props) => {
  //const history = useHistory();
  const storage = getStorage();
  const [creatorImage, setCreatorImage] = useState("");
  const [joineeImage, setJoineeImage] = useState("")

  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (props.coinFlip.creatorAddress) {
    getDownloadURL(ref(storage, `${String(props.coinFlip.creatorAddress)}`))
    .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        setCreatorImage(url)

    })
    .catch((error) => {
        // Handle any errors
    });
    getDownloadURL(ref(storage, `${String(props.coinFlip.joineeAddress)}`))
    .then((url) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
        const blob = xhr.response;
        };
        xhr.open('GET', url);
        xhr.send();
        setJoineeImage(url)

    })
    .catch((error) => {
        // Handle any errors
    });
    }

  })
  return (
    <Box 
      py="0.5%"
      px="0.5%"
      borderRadius="20px"
      fontSize="13px"
      minWidth="300px"
      border="1px solid white"
      cursor="pointer"
      _hover={{ bgColor: "green" }}
      onClick={onOpen}
    >
      <CoinFlipViewer isOpen={isOpen} onOpen={onOpen} onClose={onClose} gameInfo={props.coinFlip} creatorImage={creatorImage} joineeImage={joineeImage}/>
      <Flex>
        <>
          <Box minHeight="100px" width="50%" border="1px solid white" borderRadius="20px" textAlign="center">
            <Flex>

            <Box pt="10%"pl="15%">
              <Image borderRadius="50%"src={String(creatorImage)}></Image>
            </Box>
            <Box position="absolute" pl="1.9%" pt="0.5%">
              <Image borderRadius="50%"  maxHeight="60px" maxWidth="60px"src={CoinBull}></Image>
            </Box>
            </Flex>
            <Heading fontSize="20px">{props.coinFlip.creatorAddress.substr(0, 10)}...</Heading>

            <Box pl="70px" pt="40px" minHeight="100px" width="100%" justifyContent="center" margin="0" fontSize="30px">
              <Flex margin="0">
                {props.coinFlip.buyInPrice}
                <Box pl="3px" pt="3px">
                  <FaEthereum />
                </Box>
              </Flex>
            </Box>

          </Box>

          <Box bgColor="white" height="40px" width="40px" mt="130px" mx="1%" textAlign="center" lineHeight="20px">
            <Heading color="black" fontSize="10px">VS</Heading>
       
          </Box>

          <Box width="50%" border="1px solid white" borderRadius="20px" textAlign="center">
            <Flex>
              <Box pt="10%"pl="15%">
                <Image borderRadius="50%" src={String(joineeImage)}></Image>
              </Box>
              <Box position="absolute" pl="1.9%" pt="0.5%">
                <Image borderRadius="50%"  maxHeight="60px" maxWidth="60px"src={CoinBear}></Image>
              </Box>
            </Flex>
            {props.coinFlip.joineeAddress !==
            "0x0000000000000000000000000000000000000000" ? 
              <Box>
                <Heading fontSize="20px">{props.coinFlip.winner.substr(0, 10)}...</Heading>

              <Box pl="70px" pt="40px" minHeight="100px" width="100%" justifyContent="center" margin="0" fontSize="30px">
                  <Flex>
                    {props.coinFlip.buyInPrice}
                    <Box pl="3px" pt="3px">
                      <FaEthereum />
                    </Box>
                  </Flex>
                </Box>

              </Box>
            :

              <Heading color="green"fontSize="20px">Joinable</Heading>
            }
          </Box>

        </>
          
      </Flex>


  </Box>
  );
};

export default CoinFlip;