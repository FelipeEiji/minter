import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useMoralis } from "react-moralis";
import { NextComponentTypeWithGetLayout } from "../../interfaces/interfaces";

const withAuthRedirect =
  (route: string) =>
  <P, >(Page: NextComponentTypeWithGetLayout<P>) =>
  (props: any) => {
    const router = useRouter();
    const { isInitialized, isAuthenticated } = useMoralis();
    const getLayout = Page.getLayout || ((page: any) => page);

    useEffect(() => {
      if (isInitialized && !isAuthenticated) {
        router.push(route);
      }
    }, [isInitialized, isAuthenticated]);

    if (!isAuthenticated) {
      return null;
    }

    return getLayout(<Page {...props} />);
  };

export const withAuth = withAuthRedirect("/");
