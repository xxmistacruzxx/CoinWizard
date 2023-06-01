import Head from "next/head";
import "../styles/globals.css";

const Layout = ({ children }) => <div className="layout">{children}</div>;

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>CoinWizard</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}
