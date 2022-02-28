import { useQuery, QueryClient } from "react-query";
import {
  Box,
  Flex,
  Text,
  Skeleton,
} from "@chakra-ui/react"
import { FaEthereum } from "react-icons/fa";

const OPENSEA_ASSET_URL = "https://testnets-api.opensea.io/api/v1/asset/"; // ContractAddress + '/' + id
export function TokenMetaData(props) {
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
  return (
    <Box>

      {console.log(data)}
      {isFetching || isRefetching ? (
        <Flex align="center" justify="center">
        </Flex>
      ) : (
        <>
          {data.detail == undefined && (
            <Flex>
                {data['traits'].map((trait: any) => {
                    return (
                        <Box textAlign="center" px="2px" mx="5px" border="1px solid white">
                            <>
                            {console.log(trait)}
                            </>
                            <Text fontSize="sm" color="white">{trait.trait_type}</Text>
                            <Text fontSize="sm" color="white">{trait.value}</Text>
                            <Text fontSize="sm" color="white"> {(((parseInt(trait.trait_count) * 0.01) * 10000) / 10000)* 100} %</Text>
                        </Box>
                    )
                })}
            </Flex>
          )}
        </>
      )}
    </Box>
  );
}


