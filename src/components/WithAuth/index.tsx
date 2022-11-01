import React, { useEffect } from 'react';
import { NextComponentType, NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { useMoralis } from 'react-moralis';

const withAuthRedirect = (route: string) => <P,>(
  Page: NextComponentType<NextPageContext, {}, P>
) => (props: any) => {
  const router = useRouter();
  const { isInitialized, isAuthenticated } = useMoralis();

  useEffect(() => {
    if (isInitialized && !isAuthenticated) {
      router.push(route)
    }
  }, [isInitialized, isAuthenticated])
  
  if (!isAuthenticated) return null;

  return (
    <Page {...props} />
  )
}

export const withAuth = withAuthRedirect('/');
