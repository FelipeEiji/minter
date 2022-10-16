import { getSession } from "next-auth/react";
import { GetServerSidePropsContext } from "next";

export function withAuth(onSuccess: (context: GetServerSidePropsContext) => any) {
  return async (context: GetServerSidePropsContext) => {
    const session = await getSession(context);

    if (!session) {
      return {
        redirect: {
          destination: "/",
          permanent: false,
        },
      };
    }

    return onSuccess(context);
  };
}
