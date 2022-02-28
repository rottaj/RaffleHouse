import { useQuery, QueryClient } from "react-query";
import {
  Box,
  Flex,
  Text,
  Skeleton,
  Heading
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
            <Box>
                <Box>
                    <Heading color="white" fontSize="5xl">
                      Raffle Status:
                    </Heading>
                    <Text color="white" fontSize="3xl">
                      Potential Winner:
                    </Text>
                    <Text color="white">
                        The Bored Ape Fake Club is a collection of 10,000 unique Bored Ape NFTs— unique digital collectibles living on the Ethereum blockchain. Your Bored Ape doubles as your Yacht Club membership card, and grants access to members-only benefits, the first of which is access to THE BATHROOM, a collaborative graffiti board. Future areas and perks can be unlocked by the community through roadmap activation. Visit www.YourMother.com for more details.
                    </Text>

                </Box>
                <Heading color="white" fontSize="25px">Properties: </Heading>
                <Flex>

                    {data['traits'].map((trait: any) => {
                        return (
                            <Box textAlign="center" py="5px" px="5px" mx="5px" border="2px solid white" borderRadius="20px" h={75} w={100}>
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

            </Box>
          )}
        </>
      )}
    </Box>
  );
}


