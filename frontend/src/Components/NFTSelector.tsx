import { useContext } from 'react';
import NFT from "../Components/NFT";
import { Box, propNames, SimpleGrid, Text } from "@chakra-ui/react";
import { QueryClientProvider } from "react-query";
import { MetaMaskUserContext } from "../utils/contexts";

type NftSelectorProps = {
  tokens: Array<any>;
  handleDeposit: any;
  game: string;
};

const NFTSelector = ({ tokens, handleDeposit, game }: NftSelectorProps) => {

  const {queryClient} = useContext(MetaMaskUserContext)

  return (
    <Box>
      <Text color="white" fontSize="22px">
        NFT Portfolio
      </Text>
      <Text mb={4} color="#31B67E">
        Deposit an NFT to play!
      </Text>
      <SimpleGrid minChildWidth="100px" spacing="40px" px="60px">
        {tokens.map((token, index) => (
          <Box key={index}>
              {console.log(token)}
              <NFT token={token} handleDeposit={handleDeposit} game={game}/>
          </Box>
        ))}
      </SimpleGrid>

    </Box>
  );
};

export default NFTSelector;
