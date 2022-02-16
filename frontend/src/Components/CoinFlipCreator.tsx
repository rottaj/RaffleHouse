import { useState, useEffect, useContext } from "react";
import { ethers } from "ethers";
import {
  Box,
  Flex,
  Heading,
  Input,
  Text,
  Button,
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  Tooltip,
  SliderThumb
} from "@chakra-ui/react"
import { FaEthereum } from "react-icons/fa"
import CreateCoinFlipGame from "../utils/CreateCoinFlipGame"
import { MetaMaskUserContext } from "../utils/contexts";

declare let window: any;
const CoinFlipCreator = () => {

  const {user: account} = useContext(MetaMaskUserContext);
  const [balance, setBalance]:any = useState(0)
  const [sliderValue, setSliderValue]:any = useState(0.1)
  const [showTooltip, setShowTooltip] = useState(false)


  const handleSubmit = () => {
    console.log(parseFloat(sliderValue))
    CreateCoinFlipGame(parseFloat(sliderValue))
  }

  useEffect(() => {
    const getBalance = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const balance = await provider.getBalance(account);
      setBalance((parseInt(String(balance)) * 0.1 ** 18).toFixed(2))
    }
     if (window.ethereum) {
       getBalance();
     }
  }, [])
  return (
    <Box 
      height="auto" 
      color="white"
      py="5%"
      px="22%"
      background="#141414"
      margin="0" 
      justifyContent="center" 
    >
      <Box>
        <Heading>Create Coin Flip Game</Heading>
      </Box>
      <Slider
          id='slider'
          defaultValue={5}
          min={0}
          max={100}
          colorScheme='teal'
          onChange={(v) => setSliderValue((balance * (v * 0.01)).toFixed(2))}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <SliderMark value={0} mt='1' ml='-2.5' fontSize='sm'>
            <Flex>
              <Text>{0}</Text>
              <Box pt="3px">
                <FaEthereum/>
              </Box>
            </Flex> 
          </SliderMark>
          <SliderMark value={25} mt='1' ml='-2.5' fontSize='sm'>
            <Flex>
              <Text>{balance * .25}</Text>
              <Box pt="3px">
                <FaEthereum/>
              </Box>
            </Flex> 
          </SliderMark>
          <SliderMark value={50} mt='1' ml='-2.5' fontSize='sm'>
            <Flex>
              <Text>{balance * .50}</Text>
              <Box pt="3px">
                <FaEthereum/>
              </Box>
            </Flex> 
          </SliderMark>
          <SliderMark value={75} mt='1' ml='-2.5' fontSize='sm'>
            <Flex>
              <Text>{balance * .75}</Text>
              <Box pt="3px">
                <FaEthereum/>
              </Box>
            </Flex> 
          </SliderMark>
          <SliderMark value={100} mt='1' ml='-2.5' fontSize='sm'>
            <Flex>
              <Text>{balance}</Text>
              <Box pt="3px">
                <FaEthereum/>
              </Box>
            </Flex> 
          </SliderMark>
          <SliderTrack>
            <SliderFilledTrack />
          </SliderTrack>
          <Tooltip
            hasArrow
            bg='teal.500'
            color='white'
            placement='top'
            isOpen={showTooltip}
            label={`${sliderValue} eth`}
          >
            <SliderThumb />
          </Tooltip>
        </Slider>
        <Box pt="5%">
          <Button onClick={() => handleSubmit()}color="black">Create Game</Button>
        </Box>
    </Box>
  );
};

export default CoinFlipCreator;
