import { List, ListItem, VStack, Image } from '@chakra-ui/react';
import Logo from '../../../Logo.svg';
import { navItems } from './nav-data';
import { NavItem } from './nav-item';

export const Sidebar = () => {
  return (
    <VStack
      position="fixed"
      alignItems="flex-start"
      width="full"
      height="full"
      maxW={{ base: 56, '2xl': 72 }}
      flexShrink={0}
    >
      <Image pt="22px" src={Logo} />

      <List width="full" overflowY="auto">
        {navItems.map((item, index) => (
          <ListItem key={item.label}>
            <NavItem item={item} />
          </ListItem>
        ))}
      </List>
    </VStack>
  );
};