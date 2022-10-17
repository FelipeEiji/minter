import "../styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { FileUploaderProvider } from "../src/components/FileUploader";
import { useMoralis, MoralisProvider } from "react-moralis";
import React, { useEffect } from "react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({ config });

const moralisConfig = {
  appId: process.env.NEXT_PUBLIC_MORALIS_APP_ID || "",
  serverUrl: process.env.NEXT_PUBLIC_MORALIS_SERVER_URL || "",
};

const WithMoralis: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const {
    isInitialized,
    isWeb3Enabled,
    enableWeb3,
    isAuthenticated,
    isWeb3EnableLoading,
  } = useMoralis();

  useEffect(() => {
    if (
      isInitialized &&
      isAuthenticated &&
      !isWeb3Enabled &&
      !isWeb3EnableLoading
    )
      enableWeb3();
  }, [isAuthenticated, isWeb3Enabled]);

  return <>{children}</>;
};

const MyApp = ({ Component, pageProps }: AppProps<any>) => {
  return (
    <MoralisProvider
      appId={moralisConfig.appId}
      serverUrl={moralisConfig.serverUrl}
    >
        <ChakraProvider resetCSS theme={theme}>
          <SessionProvider session={pageProps.session} refetchInterval={0}>
            <FileUploaderProvider>
              <WithMoralis>
                <Component {...pageProps} />
              </WithMoralis>
            </FileUploaderProvider>
          </SessionProvider>
        </ChakraProvider>
    </MoralisProvider>
  );
};

export default MyApp;
