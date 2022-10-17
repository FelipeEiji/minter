import { withAuth } from "../../src/components/WithAuth";
import { useMoralisQuery } from 'react-moralis'
import { Spinner } from "@chakra-ui/react";

const NFTsForSale = () => {
    const { data, isLoading } = useMoralisQuery('MarketItem')

    if (isLoading) return <Spinner />

    console.log(data)

    return (
        <code>
            { JSON.stringify(data, null, 2 )}
        </code>
    )
}

export default withAuth(NFTsForSale);
