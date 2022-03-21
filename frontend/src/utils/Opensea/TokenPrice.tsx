
/*
    --------------IMPORTANT---------------

    TokenPrice is being deprecated... Moving all logic to NFT.
    ./Components/NFT.tsx
*/


import { useQuery, QueryClient } from "react-query";
import {
  Box,
  Flex,
  Text,
  Skeleton,
} from "@chakra-ui/react"
import { FaEthereum } from "react-icons/fa";

const OPENSEA_ASSET_URL = "https://testnets-api.opensea.io/api/v1/asset/"; // ContractAddress + '/' + id
export function TokenPrice(props) {
  const invalidQueries = async () => {
    await props.queryClient.invalidateQueries(
      `${props.token.tokenName}_${props.token.tokenID}`
    );
  };

  let assetUrl =
    OPENSEA_ASSET_URL + props.token.contractAddress + "/" + props.token.tokenID;
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
    `${props.token.tokenName}_${props.token.tokenID}`,
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
  );
}

