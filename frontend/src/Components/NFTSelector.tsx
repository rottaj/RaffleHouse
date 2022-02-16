import NFT from "../Components/NFT";
import { Box, SimpleGrid, Text } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
const queryClient = new QueryClient();

type NftSelectorProps = {
  tokens: Array<any>;
  tokenHandler: any;
};

const NFTSelector = ({ tokens, tokenHandler }: NftSelectorProps) => {
  return (

    <QueryClientProvider client={queryClient}>
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
              <NFT token={token}/>
          </Box>
        ))}
      </SimpleGrid>
      <ReactQueryDevtools initialIsOpen />
    </Box>
    </QueryClientProvider>
  );
};

export default NFTSelector;
