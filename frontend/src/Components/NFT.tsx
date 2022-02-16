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

import { useQuery } from "react-query";

const OPENSEA_CONTRACT_URL =
  "https://testnets-api.opensea.io/api/v1/asset_contract/";
const OPENSEA_ASSET_URL = 
  "https://testnets-api.opensea.io/api/v1/asset/"; // ContractAddress + '/' + id
const OPENSEA_COLLECTION_URL =
 "https://testnets-api.opensea.io/api/v1/collection/"; // collection-name + '/stats'
 


type NFTProps = {
  token: any;
};

function TokenPrice(props) {
  const [tokenPrice, setTokenPrice] = useState("");
  let assetUrl = OPENSEA_ASSET_URL + props.token.contractAddress + "/" + props.token.tokenID
  const fetchPrice = (tokenPrice) => fetch(assetUrl).then((res) => res.json()).then((data) => setTokenPrice(data['collection']['stats']['average_price']));
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isPreviousData,
  } = useQuery(['tokenPrice', tokenPrice], () => fetchPrice(tokenPrice), { keepPreviousData : true })
  return (
    <Box>
      {isLoading ? (
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
              <FaEthereum/>
            </Box>
          </Flex>
        </Text>

      )}
    </Box>
  )

}


const NFT = ({ token }: NFTProps) => {
  //const [tokenPrice, setTokenPrice] = useState("");

  /*
  useEffect(() => {
    const GetTokenPrice = async () => {

    }
    GetTokenPrice()

  }, []);
  */

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

                      {/*<Text>Price: {tokenPrice}</Text>*/}
                      <TokenPrice token={token}/>
                      <Flex h="full">
                        <Button
                          alignSelf="flex-end"
                          bgColor="#3a0ca3"
                          w="140px"
                          color="white"
                          _hover={{ bgColor: "#4361ee" }}
                          _active={{ bgColor: "#390099" }}
                          mr={4}
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
              <TokenPrice token={token}/>
              {/*
              {isLoading ? (
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
                      <FaEthereum/>
                    </Box>
                  </Flex>

                </Text>

              )}
              */}
            </Flex>
          </Box>
        </>
      ) : null}
    </Box>
  );
};

export default NFT;
