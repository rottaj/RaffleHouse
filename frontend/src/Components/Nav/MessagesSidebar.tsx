import {
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  useDisclosure,
  Drawer,
  DrawerCloseButton,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import Messages from "../Messages";
import { MdOutlineMessage } from "react-icons/md";

const DrawerComponent = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Icon
        pos="fixed"
        top="20px"
        right="20px"
        w="40px"
        h="40px"
        zIndex={1200}
        cursor="pointer"
        color="white"
        _hover={{ color: "red" }}
        onClick={onOpen}
        as={MdOutlineMessage}
      />
      <Drawer
        placement="right"
        onClose={onClose}
        isOpen={isOpen}
        closeOnOverlayClick
      >
        <DrawerOverlay />
        <DrawerContent zIndex="sticky" p={0}>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Messages</DrawerHeader>
          <DrawerBody p={0}>
            <Messages />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default DrawerComponent;
