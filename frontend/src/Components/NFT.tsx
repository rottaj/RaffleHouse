import { useState, useEffect } from "react";
import {
  Box,
  Flex,
  Button,
  Image,
  Modal,
  ModalOverlay,
  ModalBody,
  ModalContent,
  useDisclosure,
  Text,
  ModalHeader,
  Skeleton,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";

const OPENSEA_CONTRACT_URL =
  "https://testnets-api.opensea.io/api/v1/asset_contract/";
const OPENSEA_ASSET_URL = "https://testnets-api.opensea.io/api/v1/asset/"; // ContractAddress + '/' + id
const OPENSEA_COLLECTION_URL =
  "https://testnets-api.opensea.io/api/v1/collection/"; // collection-name + '/stats'

type NFTProps = {
  token: any;
};

const NFT = ({ token }: NFTProps) => {
  const [tokenPrice, setTokenPrice] = useState("");
  const [isTokenPriceLoading, setIsTokenPriceLoading] = useState(true);

  const getOpenSeaPrice = async (token: any) => {
    let i = 0;

    var interval = setInterval(() => {
      if (token !== undefined && token !== "undefined" && i >= 0) {
        //let tokens = [...this.state.userTokens];
        if (token !== undefined && token !== "undefined") {
          //console.log(token)
          let assetUrl =
            OPENSEA_ASSET_URL + token.contractAddress + "/" + token.tokenID;
          let collectionUrl =
            OPENSEA_COLLECTION_URL + token.tokenName + "/stats";
          try {
            fetch(assetUrl)
              .then((res) => {
                return res.json();
              })
              .then((data) => {
                if (
                  data !== undefined &&
                  data !== "undefined" &&
                  token !== undefined
                ) {
                  if (
                    data.collection !== undefined &&
                    data.collection !== "undefined" &&
                    data.collection["payment_tokens"].length !== 0
                  ) {
                    let price = String(
                      data["collection"]["stats"]["average_price"].toFixed(2)
                    );
                    setTokenPrice(price);
                    setIsTokenPriceLoading(false);
                    i = -1;
                  }
                }
              });
          } catch (err) {}
        } else if (i >= 5) {
          i = -1; // pretty shitty way but whatever ( will prob delete later )
        }
        i++;
      } else {
        clearInterval(interval);
      }
    }, 3000);
  };

  useEffect(() => {
    getOpenSeaPrice(token);
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box height="100%" width="100%" maxW="250px">
      {token?.image ? (
        <>
          <Image
            cursor="pointer"
            borderRadius="20px"
            objectFit="contain"
            onClick={onOpen}
            src={token.image}
            _hover={{ transform: "scale(1.05)" }}
            transition="transform .2s"
          />

          <Box>
            <Button
              mt={2}
              isFullWidth
              bgColor="#3a0ca3"
              color="white"
              _hover={{ bgColor: "#4361ee" }}
              _active={{ bgColor: "#390099" }}
              onClick={onOpen}
              isLoading={isTokenPriceLoading}
            >
              Deposit
            </Button>
            <Modal
              isOpen={isOpen}
              onClose={onClose}
              isCentered
              size="lg"
              preserveScrollBarGap
            >
              <ModalOverlay />
              <ModalContent bgColor="#1c191c" color="white" pb={12}>
                <ModalHeader>{token.tokenName}</ModalHeader>

                <ModalBody>
                  <Flex>
                    <Image
                      width="200px"
                      height="200px"
                      src={token.image}
                      objectFit="contain"
                    />
                    <Flex ml={4} fontSize="3xl" w="100%" flexDir="column">
                      <Text>Token ID: {token.tokenID}</Text>
                      <Text>Price: {tokenPrice}</Text>
                      <Flex h="full">
                        <Button
                          alignSelf="flex-end"
                          bgColor="#3a0ca3"
                          w="140px"
                          color="white"
                          _hover={{ bgColor: "#4361ee" }}
                          _active={{ bgColor: "#390099" }}
                          mr={4}
                          isLoading={isTokenPriceLoading}
                        >
                          Deposit
                        </Button>
                        <Button
                          onClick={onClose}
                          color="red"
                          alignSelf="flex-end"
                        >
                          Cancel
                        </Button>
                      </Flex>
                    </Flex>
                  </Flex>
                </ModalBody>
              </ModalContent>
            </Modal>
            <Flex pl="8px">
              {isTokenPriceLoading ? (
                <Flex align="center" justify="center">
                  <Text color="white" fontSize="md" mr={1}>
                    Price:
                  </Text>
                  <Skeleton h="80%">0.03 eth</Skeleton>
                </Flex>
              ) : (
                <Text color="white" fontSize="md">
                  <Flex letterSpacing="1px">
                    Price: {tokenPrice}
                    <Box pt="3px">
                      <FaEthereum />
                    </Box>
                  </Flex>
                </Text>
              )}
            </Flex>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default NFT;
