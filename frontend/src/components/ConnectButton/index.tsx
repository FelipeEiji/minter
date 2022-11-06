import { signOut } from "next-auth/react";
import { useMoralis } from 'react-moralis';
import { Button, Text, HStack, Avatar, useToast } from "@chakra-ui/react";
import { getEllipsisTxt } from "../../utils/format";
import { CHAIN_ID } from "../../config/constants";

const ConnectButton = () => {
  const { logout, authenticate, isAuthenticated, account } = useMoralis();
  const toast = useToast();

  const handleAuth = async () => {
    try {
      await authenticate({
        chainId: CHAIN_ID
      })
    } catch (e) {
      toast({
        title: "Oops, something is wrong...",
        description: (e as { message: string })?.message,
        status: "error",
        position: "top-right",
        isClosable: true,
      });
    }
  };

  const handleDisconnect = async () => {
    await logout();
    signOut({ callbackUrl: "/" });
  };

  if (isAuthenticated && account) {
    return (
      <HStack onClick={handleDisconnect} cursor={"pointer"}>
        <Avatar size="xs" />
        <Text fontWeight="medium">{getEllipsisTxt(account)}</Text>
      </HStack>
    );
  }

  return (
    <Button size="sm" onClick={handleAuth} colorScheme="blue">
      Connect Wallet
    </Button>
  );
};

export default ConnectButton;