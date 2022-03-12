import {
  Box,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import CoinBull from "../../../images/coinBull.png";
import CoinBear from "../../../images/coinBear.png";
import { useQuery } from "react-query";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const CoinFlipUser = ({
  address,
  isBull,
  buyInPrice,
  ethusd,
}: {
  address: string;
  isBull: boolean;
  buyInPrice: number;
  ethusd: number;
}) => {
  const storage = getStorage();
  const getImage = async () => {
    const data = await getDownloadURL(ref(storage, address)).catch((err) => {
      console.log(err);
      return null;
    });
    return data;
  };
  const { data: image } = useQuery(address, getImage, {
    staleTime: Infinity,
  });

  return (
    <Box
      minHeight="100px"
      width="50%"
      border="1px solid white"
      borderRadius="20px"
      textAlign="center"
    >
      <Flex>
        <Box pt="10%" px="10px" w="100%" h="100%">
          <Image
            borderRadius="50%"
            fallback={<SkeletonCircle w="100%" h="100%" />}
            src={image}
          />
        </Box>
        <Box position="absolute" pl="16px" pt="0.5%">
          <Image
            borderRadius="50%"
            maxHeight="60px"
            maxWidth="60px"
            src={isBull ? CoinBull : CoinBear}
          ></Image>
        </Box>
      </Flex>
      <Heading fontSize="20px">{address.substr(0, 10)}...</Heading>

      <Flex
        pt="40px"
        minHeight="100px"
        width="100%"
        justifyContent="center"
        margin="0"
        flexDir="column"
        align="center"
        fontSize="30px"
      >
        <Flex margin="0">
          {buyInPrice}
          <Box pl="3px" pt="3px">
            <FaEthereum />
          </Box>
        </Flex>
        <Text>${parseFloat(String(buyInPrice * ethusd)).toFixed(2)}</Text>
      </Flex>
    </Box>
  );
};

export default CoinFlipUser;
