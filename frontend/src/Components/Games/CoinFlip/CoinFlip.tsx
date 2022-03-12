import { useState, useEffect, useContext } from "react";
//import { Redirect, Link, useHistory } from "react-router-dom";
import CoinBull from ".../.../images/coinBull.png";
import CoinBear from "../../../images/coinBear.png";
import CoinFlipViewer from "../../../Containers/CoinFlipViewer";
import { _CoinFlips_abi } from "../../../interfaces/CoinFlips_Interface";
import {
  _CoinFlip_abi,
  _CoinFlip_bytecode,
} from "../../../interfaces/CoinFlip_Interface";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  Box,
  Flex,
  Image,
  Button,
  Heading,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";
import { MetaMaskUserContext } from "../../../utils/contexts";
import CoinFlipUser from "./CoinFlipUser";

interface Props {
  coinFlip: any;
}

const CoinFlip = (props: Props) => {
  //const history = useHistory();
  const { networkStats } = useContext(MetaMaskUserContext);
  const storage = getStorage();
  const [creatorImage, setCreatorImage] = useState("");
  const [joineeImage, setJoineeImage] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();

  // useEffect(() => {
  //   if (props.coinFlip.creatorAddress) {
  //     getDownloadURL(ref(storage, `${String(props.coinFlip.creatorAddress)}`))
  //       .then((url) => {
  //         const xhr = new XMLHttpRequest();
  //         xhr.responseType = "blob";
  //         xhr.onload = (event) => {
  //           const blob = xhr.response;
  //         };
  //         xhr.open("GET", url);
  //         xhr.send();
  //         setCreatorImage(url);
  //       })
  //       .catch((error) => {
  //         // Handle any errors
  //       });
  //     getDownloadURL(ref(storage, `${String(props.coinFlip.joineeAddress)}`))
  //       .then((url) => {
  //         const xhr = new XMLHttpRequest();
  //         xhr.responseType = "blob";
  //         xhr.onload = (event) => {
  //           const blob = xhr.response;
  //         };
  //         xhr.open("GET", url);
  //         xhr.send();
  //         setJoineeImage(url);
  //       })
  //       .catch((error) => {
  //         // Handle any errors
  //       });
  //   }
  // });
  return (
    <Box
      py="0.5%"
      px="0.5%"
      borderRadius="20px"
      fontSize="13px"
      minWidth="300px"
      border="1px solid white"
      cursor="pointer"
      _hover={{ border: "3px solid green" }}
      onClick={onOpen}
    >
      {console.log("BITCH", props.coinFlip.joineeAddress)}
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
              address={props.coinFlip.creatorAddress as string}
              isBull={true}
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
  );
};

export default CoinFlip;
