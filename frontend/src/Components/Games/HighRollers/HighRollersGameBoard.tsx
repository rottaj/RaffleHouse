import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { ethers } from "ethers";
import { useContext } from "react";
import { DonutChart } from "react-circle-chart";
import { FaEthereum } from "react-icons/fa";
import NFT from "../../NFT";

import { _abi } from "../../../interfaces/Eyescream_Interface";
import { MetaMaskUserContext } from "../../../utils/contexts";

const HighRollersCircle = ({
  usersWithData,
  totalEthInGame,
  userTokens,
  contractAddress,
}: {
  usersWithData: Array<any>;
  totalEthInGame: number;
  userTokens: any;
  contractAddress: string;
}) => {
  const { user: account } = useContext(MetaMaskUserContext);

  const handleDeposit = async (selectedToken: any) => {
    console.log("SELECTED TOKEN", selectedToken);
    var provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const collectionContract = new ethers.Contract(
      selectedToken.contractAddress,
      _abi,
      signer
    );
    const sendingTxn = await collectionContract.transferFrom(
      account,
      contractAddress,
      selectedToken.tokenID
    );
    sendingTxn.wait();
    if (sendingTxn) {
      const requestParameters = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token: selectedToken,
          playerAddress: account,
        }), // CREATE REQUEST BODY ( WILL ADD CONTRACT ADDRESS + TOKEN ID FOR BACKEND AUTH)
      };
      await fetch(
        "http://127.0.0.1:8080/submit-tickets-high-rollers",
        requestParameters
      )
        .then((res) => {
          // FETCH TO HIGHROLLER API
          return res.json();
        })
        .then((data) => {
          console.log(data);
        });
    }
  };

  const colorScheme = [
    "#FF8A00",
    "#FBFF38",
    "#FF3838",
    "#38FFE7",
    "#7902D7",
    "#0217D7",
  ];

  const donutItemArr = usersWithData.map((user, index) => {
    return {
      value: (user.totalEth / totalEthInGame) * 100,
      displayValue: parseFloat(user.totalEth).toFixed(2) + " eth",
      label: user.totalEth,
      color: colorScheme[index % colorScheme.length],
    };
  });

  const { isOpen, onOpen, onClose } = useDisclosure();

  const userIsInGame = usersWithData.some((user) => user.address === account);

  return (
    <Box>
      <Flex justify="center" align="center" maxW={500} w="100%">
        <Box pos="absolute" borderRadius="50%" border="4px solid white" p={8}>
          <Text fontSize="18px">Current pot value</Text>
          <Flex fontSize="34px" justify="center" align="center">
            <Text>~{totalEthInGame}</Text>
            <FaEthereum />
          </Flex>
          <Flex align="center" flexDir="column">
            <Text fontSize="18px">Game ends in</Text>
            <Text fontSize="34px">3 minutes</Text>
          </Flex>
        </Box>
        <DonutChart
          items={donutItemArr}
          showTotal={false}
          size={500}
          totalTextColor="white"
          roundedCaps={false}
          tooltipFontSize={"32px"}
          tooltipSx={{ padding: "12px", zIndex: 9000 }}
        />
      </Flex>
      <Flex justify="center">
        <Button
          bgColor="green"
          onClick={onOpen}
          _hover={{ bgColor: "lightGreen" }}
          _active={{ bgColor: "darkGreen" }}
        >
          {userIsInGame ? "Deposit another NFT" : "Join Game"}
        </Button>
      </Flex>

      <Modal size="2xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bgColor="#000000" border="1px solid white">
          <ModalHeader>
            <Flex color="white" justify="center" fontSize="34px">
              <Text>Deposit an&nbsp;</Text>
              <Text color="green">&nbsp;NFT</Text>
              <Text>&nbsp;to play</Text>
            </Flex>
          </ModalHeader>
          <ModalBody>
            <SimpleGrid minChildWidth="80px" spacing="12px" px="20px">
              {userTokens.map((token, index) => (
                <Box key={index}>
                  <NFT
                    token={token}
                    handleDeposit={handleDeposit}
                    game="highrollers"
                  />
                </Box>
              ))}
            </SimpleGrid>
          </ModalBody>

          <ModalFooter>
            <Button color="red" mr={3} onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default HighRollersCircle;
