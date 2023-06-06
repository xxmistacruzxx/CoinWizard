import axios from "axios";
import { marked } from "marked";

import styles from "../../styles/coinPage.module.css";
import Header from "../../components/Header/Header.jsx";
import PoweredByFooter from "../../components/PoweredByFooter/PoweredByFooter.jsx";
import Chart from "../../components/Chart/Chart.jsx";

export default function coinPage(props) {
  marked.use({ mangle: false, headerIds: false });
  let currency = "USD";

  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.coinContainer}>
        <div className={styles.coinHeader}>
          <div>
            <img src={props.imageURL} />
            <h2>
              {props.fullName} | {props.coinName}
            </h2>
          </div>
          <div>
            <p>Data Obtained at {props.timeObtained}</p>
          </div>
        </div>
        <div className={styles.coinMarket}>
          <h2>Market</h2>
          <div className={styles.quickFacts}>
            <div>
              <p>Price</p>
              <p>{props.currPrice}</p>
            </div>
            <div>
              <p>Price Change (24H)</p>
              <p style={{ color: props.priceChange24h.color }}>
                {props.priceChange24h.value}
              </p>
            </div>
            <div>
              <p>Price Change (1H)</p>
              <p style={{ color: props.priceChange1h.color }}>
                {props.priceChange1h.value}
              </p>
            </div>
            <div>
              <p>Circulating Supply</p>
              <p>{props.circulatingSupply.value}</p>
            </div>
            <div>
              <p>Volume (24H)</p>
              <p>{props.volume24h.value}</p>
            </div>
            <div>
              <p>Volume (1H)</p>
              <p>{props.volume24h.value}</p>
            </div>
          </div>
          <div className={styles.coinMarketHistory}>
            <h3>Price History (USD over 1 Month)</h3>
            <Chart data={props.history} />
          </div>
        </div>
        <div className={styles.coinBlockchain}>
          <h2>Blockchain</h2>
          <div className={styles.quickFacts}>
            <div>
              <p>Hashrate Today (TH/s)</p>
              <p>{props.hashrate}</p>
            </div>
            <div>
              <p>Block Time Today (s)</p>
              <p>{props.block_size}</p>
            </div>
            <div>
              <p>Block Size Today (bytes)</p>
              <p>{props.block_size}</p>
            </div>
            <div>
              <p>Active Addresses Today</p>
              <p>{props.active_addresses}</p>
            </div>
            <div>
              <p>Total Number of Addresses</p>
              <p>{props.unique_addresses_all_time}</p>
            </div>
            <div>
              <p>Total Number of Zero-Balance Addresses</p>
              <p>{props.zero_balance_addresses_all_time}</p>
            </div>
          </div>
        </div>
        <div
          className={styles.coinAbout}
          dangerouslySetInnerHTML={{
            __html: `<h2>About ${`${props.fullName}`}</h2>${marked
              .parse(props.summary)
              .replaceAll("<h2", "<h3")
              .replaceAll("</h2", "</h3")}`,
          }}
        ></div>
      </div>
      <PoweredByFooter />
    </div>
  );
}

export async function getServerSideProps(context) {
  const { coinName } = context.query;

  let currency = "USD";
  let coinData;
  let timeObtained = new Date();

  // GETTING MARKET INFO
  let response = await axios.get(
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coinName}&tsyms=${currency}`
  );
  // console.log(response.data);
  if (response.data.Response === "Error") {
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
      props: {},
    };
  }
  let rawData = response.data["RAW"][coinName][currency];
  let displayData = response.data["DISPLAY"][coinName][currency];

  coinData = {
    timeObtained: timeObtained.toString(),
    coinName: coinName,
    imageURL: `https://www.cryptocompare.com${rawData["IMAGEURL"]}`,
    currPrice: displayData["PRICE"],
    marketCap: {
      value: `${displayData["MKTCAP"]}`,
    },
    priceChange1h: {
      value: `${displayData["CHANGEPCTHOUR"]}%`,
      color: `${
        rawData["CHANGEPCTHOUR"] >= 0
          ? "var(--text-color4)"
          : "var(--text-color3)"
      }`,
    },
    priceChange24h: {
      value: `${displayData["CHANGEPCT24HOUR"]}%`,
      color: `${
        rawData["CHANGEPCT24HOUR"] >= 0
          ? "var(--text-color4)"
          : "var(--text-color3)"
      }`,
    },
    circulatingSupply: {
      value: `${displayData["CIRCULATINGSUPPLY"]}`,
    },
    volume1h: {
      value: `${displayData["VOLUMEHOUR"]}`,
    },
    volume24h: {
      value: `${displayData["VOLUME24HOUR"]}`,
    },
  };

  // GETTING GENERAL INFO
  response = await axios.get(
    `https://data-api.cryptocompare.com/asset/v1/data/by/symbol?asset_symbol=${coinName}`
  );
  response = response.data.Data;
  coinData = {
    ...coinData,
    fullName: response["NAME"],
    summary: response["ASSET_DESCRIPTION"],
  };

  // GETTING BLOCKCHAIN
  response = await axios.get(
    `https://min-api.cryptocompare.com/data/blockchain/latest?fsym=${coinName}&api_key=${process.env.cryptocompare}`
  );
  response = response.data.Data;
  coinData = {
    ...coinData,
    hashrate: response["hashrate"] ? response["hashrate"] : "Unprovided",
    block_time: response["block_time"] ? response["block_time"] : "Unprovided",
    block_size: response["block_size"] ? response["block_size"] : "Unprovided",
    active_addresses: response["active_addresses"]
      ? response["active_addresses"]
      : "Unprovided",
    unique_addresses_all_time: response["unique_addresses_all_time"]
      ? response["unique_addresses_all_time"]
      : "Unprovided",
    zero_balance_addresses_all_time: response["zero_balance_addresses_all_time"]
      ? response["zero_balance_addresses_all_time"]
      : "Unprovided",
  };

  // GETTING HISTORICAL DATA
  response = await axios.get(
    `https://min-api.cryptocompare.com/data/v2/histoday?fsym=${coinName}&tsym=${currency}&limit=31`
  );
  response = response.data.Data.Data;
  for (let i = 0; i < response.length; i++) {
    let unix_timestamp = Number(response[i]["time"]);
    let date = new Date(unix_timestamp * 1000);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let formattedTime = `${month}/${day}`;
    response[i]["time"] = formattedTime;
  }
  coinData = { ...coinData, history: response };

  return {
    props: coinData,
  };
}
