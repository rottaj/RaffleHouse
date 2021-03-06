import { useContext, useState } from "react";
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
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb,
  Spinner,
  Heading,
} from "@chakra-ui/react";
import { FaEthereum } from "react-icons/fa";

import { useQuery, QueryClient } from "react-query";
import { MetaMaskUserContext } from "../utils/contexts";
import { TokenPrice } from "../utils/Opensea/TokenPrice";

const OPENSEA_CONTRACT_URL =
  "https://testnets-api.opensea.io/api/v1/asset_contract/";
const OPENSEA_ASSET_URL = "https://testnets-api.opensea.io/api/v1/asset/"; // ContractAddress + '/' + id
const OPENSEA_COLLECTION_URL =
  "https://testnets-api.opensea.io/api/v1/collection/"; // collection-name + '/stats'

type NFTProps = {
  token: any;
  handleDeposit: any;
  game: string;
};

export function NFT({ token, handleDeposit, game }: NFTProps) {
  const { queryClient } = useContext(MetaMaskUserContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [reservePrice, setReservePrice]: any = useState(10);
  const [minimumBuyIn, setMinimumBuyIn]: any = useState(100);
  const [sliderValueOne, setSliderValueOne]: any = useState(0.1);
  const [sliderValueTwo, setSliderValueTwo]: any = useState(0.1);
  const [showTooltip, setShowTooltip] = useState(false);

  const invalidQueries = async () => {
    await queryClient.invalidateQueries(
      `${token.tokenName}_${token.tokenID}`
    );
  };

  let assetUrl =
    OPENSEA_ASSET_URL + token.contractAddress + "/" + token.tokenID;
  const fetchPrice = async () =>
    await fetch(assetUrl).then((res) => res.json());
  const {
    isLoading,
    isError,
    error,
    data,
    isFetching,
    isRefetching,
    isPreviousData,
  } = useQuery(
    `${token.tokenName}_${token.tokenID}`,
    () => fetchPrice(),
    {
      keepPreviousData: true,
      retry: 5,
      staleTime: Infinity,
      onSuccess: (data) => {
        if (
          data.detail ==
          "Request was throttled. Expected available in 1 second."
        ) {
          invalidQueries();
        }
      },
    }
  );

  const getTokenPrice = (data: any) => {
    let tokenPrice: any = parseFloat(data['collection']['stats']['average_price']).toFixed(2);
    const total_supply: any = parseInt(data['collection']['stats']['total_supply']);
    const traits = data['traits']
    for (let trait in traits) {
        let average_price = parseFloat(data['collection']['stats']['average_price']).toFixed(2);
        let trait_price: any = parseFloat(String(parseInt(traits[trait].trait_count) / parseInt(total_supply)))
        tokenPrice = parseFloat(String(parseFloat(tokenPrice) + parseFloat(trait_price)));
    }
    return parseFloat(tokenPrice).toFixed(2)
  }

  return (
    <Box height="100%" width="100%" maxW="250px">
      {token?.image ? (
        <>
          {game !== "highrollers-pot" ? (
            <Box>
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
                <Flex pl="8px">
                  {/*<TokenPrice token={token} queryClient={queryClient} /> */}
                  <Box>
                    {isFetching || isRefetching ? (
                      <Flex align="center" justify="center">
                        <Text color="white" fontSize="md" pr={1}>
                          <Skeleton>0.03 eth</Skeleton>
                        </Text>
                      </Flex>
                    ) : (
                      <>
                        {data.detail == undefined && (
                          <Flex>
                            <Text color="white">
                              
                              Price: {getTokenPrice(data)}
                            </Text>
                            <Box pt="3px" color="white">
                              <FaEthereum />
                            </Box>
                          </Flex>
                        )}
                      </>
                    )}
                  </Box>
                </Flex>
                <Modal
                  isOpen={isOpen}
                  onClose={onClose}
                  isCentered
                  size="lg"
                  preserveScrollBarGap
                >
                  <ModalOverlay />
                  <ModalContent bgColor="#1c191c" color="white" pb={20}>
                    <ModalHeader>{token.tokenName}</ModalHeader>

                    <ModalBody>
                      {game === "highrollers" && (
                        <Flex>
                          <Image
                            width="200px"
                            height="200px"
                            src={token.image}
                            objectFit="contain"
                          />
                          <Flex ml={4} fontSize="3xl" w="100%" flexDir="column">
                            <Text>Token ID: {token.tokenID}</Text>

                            <Box>
                              {isFetching || isRefetching ? (
                                <Flex align="center" justify="center">
                                  <Text color="white" fontSize="md" pr={1}>
                                  <Skeleton>0.03 eth</Skeleton>
                                  </Text>
                                </Flex>
                              ) : (
                              <>
                              {data.detail == undefined && (
                                <Flex>
                                  <Text color="white">
                                  Price: {getTokenPrice(data)}
                                  </Text>
                                  <Box pt="3px" color="white">
                                    <FaEthereum />
                                  </Box>
                                </Flex>
                              )}
                            </>
                            )}
                  </Box>
                            <Flex h="full">
                              <Button
                                onClick={() => 
                                  handleDeposit(Object.assign(token, {"tokenPrice": getTokenPrice(data)}))
                                }
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
                      )}
                      {game === "raffles" && (
                        <Flex>
                          <Image
                            width="200px"
                            height="200px"
                            src={token.image}
                            objectFit="contain"
                          />
                          <Flex ml={4} fontSize="3xl" w="100%" flexDir="column">
                            <Text>Token ID: {token.tokenID}</Text>

                            <TokenPrice
                              token={token}
                              queryClient={queryClient}
                            />
                            <Heading fontSize="20px"> Minimum Buy In</Heading>
                            <Slider
                              id="slider"
                              defaultValue={5}
                              min={0}
                              max={100}
                              colorScheme="green"
                              onChange={(v) =>
                                setSliderValueOne(
                                  (reservePrice * (v * 0.01)).toFixed(2)
                                )
                              }
                              onMouseEnter={() => setShowTooltip(true)}
                              onMouseLeave={() => setShowTooltip(false)}
                            >
                              <SliderMark
                                value={0}
                                mt="1"
                                ml="-2.5"
                                fontSize="sm"
                              >
                                <Flex>
                                  <Text>{0}</Text>
                                  <Box pt="3px" color="white">
                                    <FaEthereum />
                                  </Box>
                                </Flex>
                              </SliderMark>
                              <SliderMark
                                value={25}
                                mt="1"
                                ml="-2.5"
                                fontSize="sm"
                              >
                                <Flex>
                                  <Text>
                                    {(reservePrice * 0.25).toFixed(2)}
                                  </Text>
                                  <Box pt="3px">
                                    <FaEthereum />
                                  </Box>
                                </Flex>
                              </SliderMark>
                              <SliderMark
                                value={50}
                                mt="1"
                                ml="-2.5"
                                fontSize="sm"
                              >
                                <Flex>
                                  <Text>{(reservePrice * 0.5).toFixed(2)}</Text>
                                  <Box pt="3px">
                                    <FaEthereum />
                                  </Box>
                                </Flex>
                              </SliderMark>
                              <SliderMark
                                value={75}
                                mt="1"
                                ml="-2.5"
                                fontSize="sm"
                              >
                                <Flex>
                                  <Text>
                                    {(reservePrice * 0.75).toFixed(2)}
                                  </Text>
                                  <Box pt="3px">
                                    <FaEthereum />
                                  </Box>
                                </Flex>
                              </SliderMark>
                              <SliderMark
                                value={100}
                                mt="1"
                                ml="-2.5"
                                fontSize="sm"
                              >
                                <Flex>
                                  <Text>{reservePrice}</Text>
                                  <Box pt="3px">
                                    <FaEthereum />
                                  </Box>
                                </Flex>
                              </SliderMark>
                              <SliderTrack>
                                <SliderFilledTrack />
                              </SliderTrack>
                              <Tooltip
                                hasArrow
                                bg="teal.500"
                                color="white"
                                placement="top"
                                isOpen={showTooltip}
                                label={`${sliderValueOne} eth`}
                              >
                                <SliderThumb />
                              </Tooltip>
                            </Slider>
                            <Box mt="15%">
                              <Heading fontSize="20px"> Reserve Price </Heading>
                              <Slider
                                id="slider"
                                defaultValue={5}
                                min={0}
                                max={100}
                                colorScheme="green"
                                onChange={(v) =>
                                  setSliderValueTwo(
                                    (reservePrice * (v * 0.01)).toFixed(2)
                                  )
                                }
                                onMouseEnter={() => setShowTooltip(true)}
                                onMouseLeave={() => setShowTooltip(false)}
                              >
                                <SliderMark
                                  value={0}
                                  mt="1"
                                  ml="-2.5"
                                  fontSize="sm"
                                >
                                  <Flex>
                                    <Text>{0}</Text>
                                    <Box pt="3px">
                                      <FaEthereum />
                                    </Box>
                                  </Flex>
                                </SliderMark>
                                <SliderMark
                                  value={25}
                                  mt="1"
                                  ml="-2.5"
                                  fontSize="sm"
                                >
                                  <Flex>
                                    <Text>
                                      {(minimumBuyIn * 0.25).toFixed(2)}
                                    </Text>
                                    <Box pt="3px">
                                      <FaEthereum />
                                    </Box>
                                  </Flex>
                                </SliderMark>
                                <SliderMark
                                  value={50}
                                  mt="1"
                                  ml="-2.5"
                                  fontSize="sm"
                                >
                                  <Flex>
                                    <Text>
                                      {(minimumBuyIn * 0.5).toFixed(2)}
                                    </Text>
                                    <Box pt="3px">
                                      <FaEthereum />
                                    </Box>
                                  </Flex>
                                </SliderMark>
                                <SliderMark
                                  value={75}
                                  mt="1"
                                  ml="-2.5"
                                  fontSize="sm"
                                >
                                  <Flex>
                                    <Text>
                                      {(minimumBuyIn * 0.75).toFixed(2)}
                                    </Text>
                                    <Box pt="3px">
                                      <FaEthereum />
                                    </Box>
                                  </Flex>
                                </SliderMark>
                                <SliderMark
                                  value={100}
                                  mt="1"
                                  ml="-2.5"
                                  fontSize="sm"
                                >
                                  <Flex>
                                    <Box pt="3px">
                                      <FaEthereum />
                                    </Box>
                                  </Flex>
                                </SliderMark>
                                <SliderTrack>
                                  <SliderFilledTrack />
                                </SliderTrack>
                                <Tooltip
                                  hasArrow
                                  bg="teal.500"
                                  color="white"
                                  placement="top"
                                  isOpen={showTooltip}
                                  label={`${sliderValueTwo} eth`}
                                >
                                  <SliderThumb />
                                </Tooltip>
                              </Slider>
                            </Box>

                            <Flex h="full" mt="30%">
                              <Button
                                onClick={() =>
                                  handleDeposit(
                                    token,
                                    sliderValueOne,
                                    sliderValueTwo
                                  )
                                }
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
                      )}
                    </ModalBody>
                  </ModalContent>
                </Modal>
              </Box>
            </Box>
          ) : (
            <Box>
              <Image
                cursor="pointer"
                borderRadius="20px"
                objectFit="contain"
                onClick={onOpen}
                src={token.image}
                _hover={{ transform: "scale(1.05)" }}
                transition="transform .2s"
              />
              <Flex pl="8px">
                <TokenPrice token={token} queryClient={queryClient} />
              </Flex>
            </Box>
          )}
        </>
      ) : null}
    </Box>
  );
};

export default NFT;
