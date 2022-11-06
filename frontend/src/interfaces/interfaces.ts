import { EvmNftContractType } from "@moralisweb3/evm-utils";
import { NextComponentType, NextPage, NextPageContext } from "next";
import { ReactElement, ReactNode } from "react";

export interface GetWalletNFTsResponse {
  total: number;
  page: number;
  page_size: number;
  result: {
    token_address: string;
    token_id: string;
    contract_type: EvmNftContractType;
    owner_of: string;
    block_number: string;
    block_number_minted: string;
    token_uri?: string | undefined;
    metadata?: string | undefined;
    amount?: string | undefined;
    name: string;
    symbol: string;
    token_hash: string;
    last_token_uri_sync: string;
    last_metadata_sync: string;
  }[];
}

export type NextPageWithLayout<T = Record<string, unknown>> = NextPage<T> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type NextComponentTypeWithGetLayout<P> = NextComponentType<NextPageContext, Record<string, unknown>, P> & { getLayout?: (page: ReactElement) => ReactNode; }
