import { Flex, Spacer, VStack } from "@chakra-ui/react";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useMoralis } from "react-moralis";
import { ReactSVG } from "react-svg";
import ConnectButton from "../src/components/ConnectButton";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  const { isAuthenticated } = useMoralis();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push("/store");
    }
  }, [isAuthenticated]);

  return (
    <div className={styles.container}>
      <Head>
        <title>Minter</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Flex alignItems="center" justifyContent="center" minHeight="100vh">
          <VStack>
            <ReactSVG
              className="logo"
              src={"/logo.svg"}
              style={{ padding: 0 }}
            />
            <Spacer />
            <ConnectButton />
          </VStack>
        </Flex>
      </main>
    </div>
  );
};

export default Home;
