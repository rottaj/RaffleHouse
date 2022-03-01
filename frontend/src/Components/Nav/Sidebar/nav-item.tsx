import { Link, useLocation } from "react-router-dom";
import { AppRoutePaths } from "../../../utils/constants/routes";
import { Heading, Icon, Text, HStack, Box } from '@chakra-ui/react';
import { NavItem as Item } from './types/nav-item';

type Props = {
  item: Item;
  
};

export const NavItem = ({ item }: Props) => {
    const { label } = item;
    const location = useLocation();
    const isActive = location.pathname === item?.href;
  
  if (item.type === 'link') {
    const { icon, href } = item;

    return (
        <Link to={href}>
          <HStack
            align="center"
            justify="flex-start"
            height={{ base: 10, '2xl': 14 }}
            transition="ease-out"
            transitionProperty="background"
            transitionDuration="normal"
            _hover={{
              borderWidth:"9px",
              //borderBottom: '2px solid green',
              //borderRadius:"20px",
              //backgroundImage: "linear-gradient(to right, green, black)"

            }}
            borderWidth="2px"
            borderColor="transparent"
          >
            <Icon
              width={7}
              height={7}
              mr={4}
              ml={8}
              color={isActive ? "green" : "white"}
              as={icon}
            />
            <Text
              fontSize="md"
              fontWeight="medium"
              flex={1}
              letterSpacing="wider"
              color={isActive ? "green" : "whiteAlpha.900"}
            >
              {label}
            </Text>
          </HStack>
        </Link>
    )
  }

  return (
    <Heading
      color="white"
      fontWeight="normal"
      textTransform="uppercase"
      letterSpacing={6}
      fontSize="sm"
      ml={8}
      mt={{ base: 6, '2xl': 8 }}
      mb={2}
    >
      {label}
    </Heading>
  );
};
