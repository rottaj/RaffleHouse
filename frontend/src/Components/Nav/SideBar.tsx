import {
    Box,
    Button,
    Drawer,
    DrawerOverlay,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    DrawerContent,
    VStack,
  } from '@chakra-ui/react'
  
  interface Props {
    onClose: any
    isOpen: boolean
    variant: 'drawer' | 'sidebar'
  }
  
  const SidebarContent = () => (
    <VStack>
      <Button w="100%">
        Home
      </Button>
      <Button w="100%">
        About
      </Button>
      <Button w="100%">
        Contact
      </Button>
    </VStack>
  )
  
  const Sidebar = (props: Props) => {
    return props.variant === 'sidebar' ? (
      <Box
        position="fixed"
        left={0}
        p={5}
        w="200px"
        top={0}
        h="100%"
        bg="#dfdfdf"
      >
        <SidebarContent  />
      </Box>
    ) : (
      <Drawer isOpen={props.isOpen} placement="left" onClose={props.onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Chakra-UI</DrawerHeader>
            <DrawerBody>
              <SidebarContent  />
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    )
  }
  
  export default Sidebar
  