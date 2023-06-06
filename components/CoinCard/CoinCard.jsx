import axios from "axios";
import { useState } from "react";
import { Card } from "@nextui-org/react";

import styles from "./CoinCard.module.css";

export default function CoinCard({ coin }) {
  // CREATE VARIABLES
  let currency = "USD";
  let rawData;
  let displayData;

  const [imageURL, setImageURL] = useState("");
  const [currPrice, setCurrPrice] = useState("");
  const [perc24, setPerc24] = useState("");
  const [perc24Color, setPerc24Color] = useState("var(--text-color4)");
  const [cardInfo, setCardInfo] = useState({
    marketCap: { value: "" },
    priceChange1h: { value: "", color: "var(--text-color3)" },
    priceChange24h: { value: "", color: "var(--text-color3)" },
    circulatingSupply: { value: "" },
    volume1h: { value: "" },
    volume24h: { value: "" },
  });

  // MAKE REQUEST AND SET VALUES
  axios
    .get(
      `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${coin}&tsyms=${currency}`
    )
    .then((response) => {
      rawData = response.data["RAW"][coin][currency];
      displayData = response.data["DISPLAY"][coin][currency];

      setImageURL(`https://www.cryptocompare.com${rawData["IMAGEURL"]}`);
      setCurrPrice(displayData["PRICE"]);
      setPerc24(`(${displayData["CHANGEPCT24HOUR"]}%)`);
      if (rawData["CHANGEPCT24HOUR"] < 0) setPerc24Color("var(--text-color3)");

      setCardInfo({
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
      });
    });

  // CONSTRUCT CARD AND RETURN
  return (
    <Card
      isPressable
      isHoverable
      variant="bordered"
      css={{
        width: "45%",
        minWidth: "350px",
        maxWidth: "400px",
        backgroundColor: "rgba(255, 255, 255, .04)",
        marginTop: "15px",
      }}
      onClick={() => {
        location.assign(`/coin/${coin}`);
      }}
    >
      <Card.Header
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{ margin: "0px", color: "var(--text-color1)" }}>{coin}</h2>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <p
              style={{
                margin: "0px",
                marginTop: "3px",
                color: "var(--text-color2)",
              }}
            >
              {currPrice}
            </p>
            <p
              style={{
                margin: "0px",
                marginTop: "3px",
                color: `${perc24Color}`,
                marginLeft: "5px",
              }}
            >
              {perc24}
            </p>
          </div>
        </div>
        <img
          src={imageURL}
          alt={`${coin} LOGO`}
          style={{ width: "96px", height: "96px", marginRight: "12px" }}
        />
      </Card.Header>
      <Card.Body
        style={{
          color: "var(--text-color2)",
          paddingTop: "0px",
        }}
      >
        <div
          className={styles.infoDisplay}
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            marginRight: "24px",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p>MARKET CAP</p>
            <p>{cardInfo["marketCap"]["value"]}</p>
          </div>
          <div>
            <p>PRICE CHANGE (24H)</p>
            <p style={{ color: cardInfo["priceChange24h"]["color"] }}>
              {cardInfo["priceChange24h"]["value"]}
            </p>
          </div>
          <div>
            <p>PRICE CHANGE (1H)</p>
            <p style={{ color: cardInfo["priceChange1h"]["color"] }}>
              {cardInfo["priceChange1h"]["value"]}
            </p>
          </div>
          <div>
            <p>CIRCULATING SUPPLY</p>
            <p>{cardInfo["circulatingSupply"]["value"]}</p>
          </div>
          <div>
            <p>VOLUME (24H)</p>
            <p>{cardInfo["volume24h"]["value"]}</p>
          </div>
          <div>
            <p>VOLUME (1H)</p>
            <p>{cardInfo["volume1h"]["value"]}</p>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}
