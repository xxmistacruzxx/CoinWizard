import React from "react";
import axios from "axios";
import $ from "jquery";

import styles from "../styles/converter.module.css";
import Header from "../components/Header/Header.jsx";
import PoweredByFooter from "../components/PoweredByFooter/PoweredByFooter.jsx";

import { Input, Dropdown } from "@nextui-org/react";

export default function Converter(props) {
  const [currCoin, setCurrCoin] = React.useState(new Set(["BTC"]));
  const selectedCoin = React.useMemo(
    () => Array.from(currCoin).join(", ").replaceAll("_", " "),
    [currCoin]
  );
  React.useEffect(() => {
    updateCurrencyValue();
  }, [currCoin]);

  const [currCurrency, setCurrCurrency] = React.useState(new Set(["USD"]));
  const selectedCurrency = React.useMemo(
    () => Array.from(currCurrency).join(", ").replaceAll("_", " "),
    [currCurrency]
  );
  React.useEffect(() => {
    updateCoinValue();
  }, [currCurrency]);

  function updateCoinValue() {
    let currencyInputValue = $("#currencyInput")[0].value;
    if (currencyInputValue.trim() === "") return;
    currencyInputValue = Number(currencyInputValue);
    let coinString = Array.from(currCoin).join("");
    let currencyString = Array.from(currCurrency).join("");
    let conversion =
      currencyInputValue / props.rawData[coinString][currencyString].PRICE;
    $("#coinInput")[0].value =
      Math.round(conversion * Math.pow(10, 5)) / Math.pow(10, 5);
    return;
  }

  function updateCurrencyValue() {
    let coinInputValue = $("#coinInput")[0].value;
    if (coinInputValue.trim() === "") return;
    coinInputValue = Number(coinInputValue);
    let coinString = Array.from(currCoin).join("");
    let currencyString = Array.from(currCurrency).join("");
    let conversion =
      coinInputValue * props.rawData[coinString][currencyString].PRICE;
    $("#currencyInput")[0].value = Math.round(conversion * 100) / 100;
    return;
  }

  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.converterContainer}>
        <div>
          <Input
            id="coinInput"
            label="Coin"
            type="number"
            initialValue="1"
            onChange={updateCurrencyValue}
          />
          <Dropdown>
            <Dropdown.Button
              flat
              color="secondary"
              css={{ tt: "capitalize", marginTop: "10px", width: "100%" }}
            >
              {selectedCoin}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={currCoin}
              onSelectionChange={setCurrCoin}
            >
              {props.coins.map((coin) => {
                return <Dropdown.Item key={coin}>{coin}</Dropdown.Item>;
              })}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <p>↔️</p>
        <div>
          <Input
            id="currencyInput"
            label="Currency"
            type="number"
            initialValue={
              props.rawData[props.coins[0]][props.currencies[0]]["PRICE"]
            }
            onChange={updateCoinValue}
          />
          <Dropdown>
            <Dropdown.Button
              flat
              color="secondary"
              css={{ tt: "capitalize", marginTop: "10px", width: "100%" }}
            >
              {selectedCurrency}
            </Dropdown.Button>
            <Dropdown.Menu
              aria-label="Single selection actions"
              color="secondary"
              disallowEmptySelection
              selectionMode="single"
              selectedKeys={currCurrency}
              onSelectionChange={setCurrCurrency}
            >
              {props.currencies.map((currency) => {
                return <Dropdown.Item key={currency}>{currency}</Dropdown.Item>;
              })}
            </Dropdown.Menu>
          </Dropdown>
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
  let coins = process.env.coins.split(",");
  let currencies = process.env.currencies.split(",");
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
