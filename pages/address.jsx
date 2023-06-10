import React from "react";
import $ from "jquery";
import axios from "axios";

import styles from "../styles/address.module.css";
import Header from "../components/Header/Header.jsx";

import { Input, Dropdown, Button } from "@nextui-org/react";

const satoshi = 100000000;

export default function Address() {
  let coins = ["BTC", "ETH"];
  const [currCoin, setCurrCoin] = React.useState(new Set(["BTC"]));
  const selectedCoin = React.useMemo(
    () => Array.from(currCoin).join(", ").replaceAll("_", " "),
    [currCoin]
  );
  React.useEffect(() => {
    $("#addressInput")[0].value = "";
  }, [currCoin]);

  const [result, setResult] = React.useState(<></>);
  const [BTCResult, setBTCResult] = React.useState({});
  React.useEffect(() => {
    if (Object.keys(BTCResult).length === 0) return;
    if (Object.keys(BTCResult).length === 2) {
      setResult(
        <>
          <div>
            <p>
              Error: The address "{`${BTCResult.address}`}" is either invalid or
              does not exist.
            </p>
          </div>
          {result}
        </>
      );
      return;
    }

    setResult(
      <>
        <div>
          <p>Coin: {BTCResult.coinType}</p>
          <p style={{ fontSize: ".6em" }}>Address: {BTCResult.address}</p>
          <p>Lookup Time: {BTCResult.lookupTime}</p>
          <div
            style={{ height: "3px", backgroundColor: "rgba(255,255,255,.5)" }}
          ></div>
          <p>Amount BTC: {BTCResult.amount}</p>
          <p>BTC Received: {BTCResult.received}</p>
          <p>BTC Sent: {BTCResult.sent}</p>
          <p>Time First Seen: {BTCResult.firstSeen}</p>
        </div>
        {result}
      </>
    );
  }, [BTCResult]);

  function BTCLookup() {
    let address = $(`#addressInput`)[0].value.trim();

    const requests = [
      axios.get(
        `https://blockchain.info/q/addressbalance/${address}?confirmations=3`
      ),
      axios.get(
        `https://blockchain.info/q/getreceivedbyaddress/${address}?confirmations=3`
      ),
      axios.get(
        `https://blockchain.info/q/getsentbyaddress/${address}?confirmations=3`
      ),
      axios.get(`https://blockchain.info/q/addressfirstseen/${address}`),
    ];

    let result;
    Promise.all(requests)
      .then(
        ([
          balanceResponse,
          receivedResponse,
          sentResponse,
          firstSeenResponse,
        ]) => {
          const newBTCResult = {
            coinType: "BTC",
            address: address,
            lookupTime: new Date().toTimeString(),
            amount: balanceResponse.data,
            received: receivedResponse.data,
            sent: sentResponse.data,
            firstSeen: new Date(
              Number(firstSeenResponse.data) * 1000
            ).toLocaleDateString("en-US"),
          };

          setBTCResult(newBTCResult);
        }
      )
      .catch((error) => {
        setBTCResult({ address: address, error: `${error}` });
      });

    return;
  }

  function ETHLookup() {}

  function Lookup() {
    switch (Array.from(currCoin).join("")) {
      case "BTC":
        BTCLookup();
        break;
      case "ETH":
        setResult(
          <>
            {result}
            {ETHLookup()}
          </>
        );
        break;
      default:
        console.log("NO COIN FOUND");
    }
    return;
  }

  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.lookupDiv}>
        <Dropdown>
          <Dropdown.Button
            flat
            color="secondary"
            css={{
              tt: "capitalize",
              marginTop: "20px",
              width: "50%",
              minWidth: "250px",
            }}
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
            {coins.map((coin) => {
              return <Dropdown.Item key={coin}>{coin}</Dropdown.Item>;
            })}
          </Dropdown.Menu>
        </Dropdown>
        <Input
          id="addressInput"
          label="Enter Address"
          type="string"
          initialValue=""
          css={{
            width: "50%",
            minWidth: "250px",
            marginTop: "10px",
          }}
        />
        <Button
          id="submit"
          color="secondary"
          css={{ width: "50%", minWidth: "250px", marginTop: "10px" }}
          onPress={Lookup}
        >
          Lookup Address
        </Button>
        <div id={styles.resultContainer}>{result}</div>
      </div>
    </div>
  );
}
