import { withAuth } from "../../src/components/with-auth";

const Mint = ({ address, nativeBalance }: any) => {
  return (
    <div>
      test
    </div>
  );
};

export const getServerSideProps = withAuth(async () => {
  return {
    props: {

    }
  }
});

export default Mint;
