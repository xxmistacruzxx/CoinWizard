import styles from "../styles/Index.module.css";

import Header from "../components/Header/Header.jsx";
import CoinCard from "../components/CoinCard/CoinCard.jsx";
import PoweredByFooter from "../components/PoweredByFooter/PoweredByFooter.jsx";

export default function Index(props) {
  return (
    <div className="pageContainer">
      <Header />
      <div>
        <div className={styles.coinCardList}>
          {props.coins.map((coin) => {
            return <CoinCard coin={coin} />;
          })}
        </div>
      </div>
      <PoweredByFooter />
    </div>
  );
}

export async function getServerSideProps() {
  let coins = process.env.coins.split(",");

  return { props: { coins: coins } };
}
