import NFT from "../Components/NFT";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";

type NftSelectorProps = {
  tokens: Array<any>;
  tokenHandler: any;
};

const NFTSelector = ({ tokens, tokenHandler }: NftSelectorProps) => {
  return (
    <Box>
      <Text color="white" fontSize="22px">
        NFT Portfolio
      </Text>
      <Text mb={4} color="#31B67E">
        Deposit an NFT to play!
      </Text>
      <SimpleGrid minChildWidth="100px" spacing="40px" mx="120px">
        {tokens.map((token, index) => (
          <Box key={index}>
            <NFT token={token}></NFT>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default NFTSelector;
