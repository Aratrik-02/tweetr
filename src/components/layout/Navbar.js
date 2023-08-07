// import React from "react";
// import { DASHBOARD, PROTECTED, USERS } from "lib/routes";
// import { Link as RouterLink, useNavigate } from "react-router-dom";
// import { useAuth } from "hooks/auth";
// import {
//   Flex,
//   Link,
//   Button,
//   Text,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   useMediaQuery,
//   Box,
// } from "@chakra-ui/react";
// import { useLogout } from "hooks/auth";

// export default function Navbar() {
//   const { logout, isLoading } = useLogout();
//   const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");
//   const navigate = useNavigate();
//   const { user, isLoading: userLoading } = useAuth();

//   return (
//     <Flex
//       shadow="sm"
//       pos="fixed"
//       width="full"
//       height="20"
//       zIndex="3"
//       justify="center"
//       bg="#FEFF86"
//       boxShadow="lg"
//     >
//       <Flex px="4" w="full" align="center" maxW="1200px" mx="6">
//         <Link
//           color="#6163D3"
//           as={RouterLink}
//           to={DASHBOARD}
//           fontWeight="bold"
//           fontSize="2xl"
//           style={{ textDecoration: "none" }}
//         >
//           <Text style={{ textShadow: "1px 1px 0px #000000" }}>tweetr.</Text>
//         </Link>

//         {/* Display Logout button for bigger screens */}
// {!isSmallerScreen && (
//   <Button
//     ml="auto"
//     colorScheme="blue"
//     size="sm"
//     borderRadius="10"
//     boxShadow="md"
//     px="20px"
//     py="15px"
//     onClick={logout}
//     isLoading={isLoading}
//   >
//     Logout
//   </Button>
// )}

//         {/* Dropdown menu for smaller screens */}
//         {isSmallerScreen && (
//           <Menu placement="bottom-start">
//             <MenuButton
//               ml="auto"
//               as={Button}
//               colorScheme="blue"
//               size="sm"
//               borderRadius="10"
//               boxShadow="md"
//               px="20px"
//               py="15px"
//             >
//               ☰
//             </MenuButton>
//             <MenuList>
//             <MenuItem
//                 onClick={() => navigate(DASHBOARD)}
//                 isDisabled={isLoading}
//                 colorScheme="blue"
//                 size="sm"
//                 borderRadius="10"
//                 boxShadow="md"
//                 px="20px"
//                 py="15px"
//               >
//                 Home
//               </MenuItem>
//               <MenuItem
//                 onClick={() => navigate(`${PROTECTED}/profile/${user?.id}`)}
//                 isDisabled={userLoading}
//                 colorScheme="blue"
//                 size="sm"
//                 borderRadius="10"
//                 boxShadow="md"
//                 px="20px"
//                 py="15px"
//               >
//                 View Profile
//               </MenuItem>
//               <MenuItem
//                 onClick={() => navigate(USERS)}
//                 isDisabled={isLoading}
//                 colorScheme="blue"
//                 size="sm"
//                 borderRadius="10"
//                 boxShadow="md"
//                 px="20px"
//                 py="15px"
//               >
//                 All users
//               </MenuItem>
//               <MenuItem
//                 onClick={logout}
//                 isDisabled={isLoading}
//                 colorScheme="blue"
//                 size="sm"
//                 borderRadius="10"
//                 boxShadow="md"
//                 px="20px"
//                 py="15px"
//               >
//                 Logout
//               </MenuItem>
//             </MenuList>
//           </Menu>
//         )}
//       </Flex>
//     </Flex>
//   );
// }
import React, { useState } from "react";
import { DASHBOARD, PROTECTED, USERS } from "lib/routes";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import {
  Flex,
  Link,
  Button,
  Text,
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useMediaQuery,
  VStack,
} from "@chakra-ui/react";
import { useLogout } from "hooks/auth";
import { useAuth } from "hooks/auth";
import { HamburgerIcon } from "@chakra-ui/icons";

export default function Navbar() {
  const { logout, isLoading } = useLogout();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const navigate = useNavigate();
  const { user, isLoading: userLoading } = useAuth();
  const [isSmallerScreen] = useMediaQuery("(max-width: 768px)");

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <Flex
      shadow="sm"
      pos="fixed"
      width="full"
      height="20"
      zIndex="3"
      justify="center"
      bg="#FEFF86"
      boxShadow="lg"
    >
      <Flex px="4" w="full" align="center" maxW="1200px" mx="6">
        <Link
          color="#6163D3"
          as={RouterLink}
          to={DASHBOARD}
          fontWeight="bold"
          fontSize="2xl"
          style={{ textDecoration: "none" }}
        >
          <Text style={{ textShadow: "1px 1px 0px #000000" }}>tweetr.</Text>
        </Link>

        {isSmallerScreen ? (
          // Render Drawer for smaller screens
          <Button
            ml="auto"
            colorScheme="blue"
            variant='ghost'
            size="md"
            borderRadius="10"
            onClick={toggleDrawer}
          >
            <HamburgerIcon boxSize={6} />  
          </Button>
        ) : (
          // Render Logout button for bigger screens
          <Button
            ml="auto"
            colorScheme="blue"
            size="sm"
            borderRadius="10"
            boxShadow="md"
            px="20px"
            py="15px"
            onClick={logout}
            isLoading={isLoading}
          >
            Logout
          </Button>
        )}

        {/* Drawer for smaller screens */}
        <Drawer
          isOpen={isDrawerOpen && isSmallerScreen}
          placement="left"
          onClose={toggleDrawer}
          size="xs"
        >
          <DrawerOverlay />
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader fontSize="3xl">Menu</DrawerHeader>
            <DrawerBody >
              <VStack align="start" spacing="10">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  onClick={() => {
                    navigate(DASHBOARD);
                    toggleDrawer();
                  }}
                  color="blue.500"
                >
                  Home
                </Text>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  onClick={() => {
                    navigate(`${PROTECTED}/profile/${user?.id}`);
                    toggleDrawer();
                  }}
                  color="blue.500"
                >
                  Profile
                </Text>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  onClick={() => {
                    navigate(USERS);
                    toggleDrawer();
                  }}
                  color="blue.500"
                >
                  All Users
                </Text>
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  onClick={() => {
                    logout();
                    toggleDrawer();
                  }}
                  color="red.500"
                >
                  Logout
                </Text>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </Drawer>
      </Flex>
    </Flex>
  );
}
