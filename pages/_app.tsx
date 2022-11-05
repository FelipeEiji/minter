import "antd/dist/antd.css";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";
import { SessionProvider } from "next-auth/react";
import { FileUploaderProvider } from "../src/components/FileUploader";
import { useMoralis, MoralisProvider } from "react-moralis";
import React, { useEffect } from "react";
import nookies from "nookies";
import ErrorBoundary from "../src/components/ErrorBoundary";

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
    account,
  } = useMoralis();

  useEffect(() => {
    if (
      isInitialized &&
      isAuthenticated &&
      !isWeb3Enabled &&
      !isWeb3EnableLoading
    )
      {enableWeb3();}
  }, [isAuthenticated, isWeb3Enabled]);

  useEffect(() => {
    if (account) {
      nookies.set(null, "account", account);
    } else {
      nookies.destroy(null, "account");
    }
  }, [account]);

  return <>{children}</>;
};

const MyApp = ({ Component, pageProps }: any) => {
  const getLayout = Component.getLayout || ((page: any) => page);

  return (
    <MoralisProvider
      appId={moralisConfig.appId}
      serverUrl={moralisConfig.serverUrl}
    >
      <ChakraProvider resetCSS theme={theme}>
        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <FileUploaderProvider>
            <WithMoralis>
              <ErrorBoundary>
                {getLayout(<Component {...pageProps} />)}
              </ErrorBoundary>
            </WithMoralis>
          </FileUploaderProvider>
        </SessionProvider>
      </ChakraProvider>
    </MoralisProvider>
  );
};

export default MyApp;
