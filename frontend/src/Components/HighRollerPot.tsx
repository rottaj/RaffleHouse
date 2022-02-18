import {useContext} from "react"
import NFT from "./NFT";
import { Flex, Grid, GridItem, Heading } from "@chakra-ui/react";
import {MetaMaskUserContext} from "../utils/contexts"
interface Props {
  tokens: any;
}

const HighRollersPot = (props: Props) => {

  return (
    <Flex w="100%" h="100%">
      {console.log("FOOOOOOBAR", props)}
      {props.tokens.length !== 0 ? (
        <Grid
          templateColumns="repeat(5, 1fr)"
          gap={2}
          width="75%"
          borderRadius="20px"
          mx="15%"
        >
          {props.tokens.map((token: any) => {
            return <GridItem>{<NFT token={token} handleDeposit={{}} game={"highrollers-pot"}></NFT>}</GridItem>;
          })}
        </Grid>
      ) : (
        <Flex w="full" justify="center" pt={4}>
          <Heading color="white" fontSize="30px">
            No Tokens
          </Heading>
        </Flex>
      )}
    </Flex>
  );
};

export default HighRollersPot;
