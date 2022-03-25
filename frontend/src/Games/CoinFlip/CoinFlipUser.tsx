import {
  Box,
  Flex,
  Heading,
  Image,
  SkeletonCircle,
  Text,
  Tr,
  Td
} from "@chakra-ui/react";
import React from "react";
import { FaEthereum } from "react-icons/fa";
import CoinBull from "../../images/coinBull.png";
import CoinBear from "../../images/coinBear.png";
import { useQuery } from "react-query";
import { getDownloadURL, getStorage, ref } from "firebase/storage";

const CoinFlipUser = ({
  address,
  isBull,
  buyInPrice,
  ethusd,
  isViewer,
  isCreator,
  view
}: {
  address: string;
  isBull?: boolean;
  buyInPrice: number;
  ethusd: number;
  isCreator?: boolean;
  isViewer?: boolean;
  view: string;
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
    <>
    {view == "Card" && 
      <Box
        // minHeight="100px"
        width="50%"
        // w="100%"
        border="1px solid white"
        borderRadius="20px"
        textAlign="center"
      >
        {isViewer && (
          <Text fontSize="20px" fontWeight="bold">
            {isCreator ? "Creator" : "Joinee"}
          </Text>
        )}
        <Flex>
          <Box pt="30px" px="10px" w="100%" h="100%">
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
            />
          </Box>
        </Flex>
        {!isViewer && (
          <Heading fontSize="20px">{address.substr(0, 10)}...</Heading>
        )}

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
          <Flex margin="0" align="center" justifyContent="center">
            {buyInPrice}
            <Box pl="2px" pt="3px">
              <FaEthereum />
            </Box>
          </Flex>
          <Text>${parseFloat(String(buyInPrice * ethusd)).toFixed(2)}</Text>
          {isViewer && (
            <Box w="100%">
              <Text fontSize="16px" fontWeight="bold">
                {address}
              </Text>
            </Box>
          )}
        </Flex>
      </Box>
    }
    {view == "Table" && 
      <Box>
        <Flex>
          <Image borderRadius="180px" src={image} height="7%" width="7%"></Image>
          <Heading fontSize="20px">{address.substr(0, 10)}...</Heading>
        </Flex>
      </Box>
    }
    </>
  );
};

export default CoinFlipUser;
