import axios from "axios";

import styles from "../styles/converter.module.css";
import Header from "../components/Header/Header.jsx";
import PoweredByFooter from "../components/PoweredByFooter/PoweredByFooter.jsx";

import { Input } from "@nextui-org/react";

export default function Converter(props) {
  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.converterContainer}>
        <div>
          <div>
            <Input id="coinInput" label="Coin" type="number" placeholder="1" />
          </div>
          <div>
            <Input
              id="currencyInput"
              label="Currency"
              type="number"
              placeholder="1"
            />
          </div>
        </div>
      </div>
      <div className={styles.conversionRatesContainer}>
        {props.coins.map((coin) => {
          return (
            <div key={coin}>
              <div>
                <img
                  src={`https://www.cryptocompare.com${
                    props.displayData[coin][props.currencies[0]].IMAGEURL
                  }`}
                />
                <p>{coin}</p>
              </div>
              <div>
                {props.currencies.map((currency) => {
                  return (
                    <div key={`${coin}${currency}`}>
                      {`${props.rawData[coin][currency].TOSYMBOL} ${
                        Math.round(props.rawData[coin][currency].PRICE * 100) /
                        100
                      }`}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
      <PoweredByFooter />
    </div>
  );
}

export async function getServerSideProps() {
  let coins = [
    "BTC",
    "BCH",
    "ETH",
    "LTC",
    "XMR",
    "BNB",
    "ADA",
    "SOL",
    "MATIC",
    "XRP",
    "DOGE",
  ];
  let currencies = ["USD", "CAD", "EUR", "GBP", "AUD", "CNY", "JPY"];
  let data;
  let timeObtained = new Date();

  // GETTING MARKET INFO
  let response = await axios.get(
    `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coins.join(
      ","
    )}&tsyms=${currencies.join(",")}`
  );
  let rawData = response.data["RAW"];
  let displayData = response.data["DISPLAY"];

  data = {
    timeObtained: timeObtained.toString(),
    coins: coins,
    currencies: currencies,
    rawData: rawData,
    displayData: displayData,
  };

  return {
    props: data,
  };
}
