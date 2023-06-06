import styles from "../styles/Index.module.css";

import Header from "../components/Header/Header.jsx";
import CoinCard from "../components/CoinCard/CoinCard.jsx";
import PoweredByFooter from "../components/PoweredByFooter/PoweredByFooter.jsx";

export default function Index() {
  return (
    <div className="pageContainer">
      <Header />
      <div>
        <div className={styles.coinCardList}>
          <CoinCard coin="BTC" />
          <CoinCard coin="BCH" />
          <CoinCard coin="ETH" />
          <CoinCard coin="LTC" />
          <CoinCard coin="XMR" />
          <CoinCard coin="BNB" />
          <CoinCard coin="ADA" />
          <CoinCard coin="SOL" />
          <CoinCard coin="MATIC" />
          <CoinCard coin="XRP" />
          <CoinCard coin="DOGE" />
        </div>
      </div>
      <PoweredByFooter />
    </div>
  );
}
