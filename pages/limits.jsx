import React from "react";
import axios from "axios";

import styles from "../styles/limits.module.css";
import Header from "../components/Header/Header.jsx";
import PoweredByFooter from "../components/PoweredByFooter/PoweredByFooter.jsx";

export default function Limits(props) {
  const [localLimitData, setLocalLimitData] = React.useState("");

  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.limits}>
        <p>
          CoinWizard is primarily powered by CryptoCompare API. CoinWizard uses
          a free API plan from CryptoCompare to get cryptocurrency data.
          Unfortunately, this means that there's a limited number of calls you
          can make on CoinWizard. This page shows the various call limits from
          CryptoCompare.
        </p>
        <div id="localLimit">
          <h2>Local Call Limits</h2>
          <div>
            <p>{`Calls left this second: ${
              localLimitData !== "" ? localLimitData.Data.calls_left.second : ""
            }`}</p>
            <p>{`Calls left this minute: ${
              localLimitData !== "" ? localLimitData.Data.calls_left.minute : ""
            }`}</p>
            <p>{`Calls left this hour: ${
              localLimitData !== "" ? localLimitData.Data.calls_left.hour : ""
            }`}</p>
            <p>{`Calls left this day: ${
              localLimitData !== "" ? localLimitData.Data.calls_left.day : ""
            }`}</p>
            <p>{`Calls left this month: ${
              localLimitData !== "" ? localLimitData.Data.calls_left.month : ""
            }`}</p>
          </div>
          <button
            onClick={() => {
              axios
                .get("https://min-api.cryptocompare.com/stats/rate/limit")
                .then((response) => {
                  setLocalLimitData(response.data);
                });
            }}
            value="Local Limit"
          >
            Get Local Limits
          </button>
        </div>
        <div id="serverBasicLimit">
          <h2>Server Call Limits</h2>
          <p>{`Calls left this second: ${props.serverBasicLimitData.Data.calls_left.second}`}</p>
          <p>{`Calls left this minute: ${props.serverBasicLimitData.Data.calls_left.minute}`}</p>
          <p>{`Calls left this hour: ${props.serverBasicLimitData.Data.calls_left.hour}`}</p>
          <p>{`Calls left this day: ${props.serverBasicLimitData.Data.calls_left.day}`}</p>
          <p>{`Calls left this month: ${props.serverBasicLimitData.Data.calls_left.month}`}</p>
        </div>
        <div id="serverKeyLimit">
          <h2>Server Key Limits</h2>
          <p>{`Calls left this second: ${props.serverKeyLimitData.Data.calls_left.second}`}</p>
          <p>{`Calls left this minute: ${props.serverKeyLimitData.Data.calls_left.minute}`}</p>
          <p>{`Calls left this hour: ${props.serverKeyLimitData.Data.calls_left.hour}`}</p>
          <p>{`Calls left this day: ${props.serverKeyLimitData.Data.calls_left.day}`}</p>
          <p>{`Calls left this month: ${props.serverKeyLimitData.Data.calls_left.month}`}</p>
        </div>
      </div>
      <PoweredByFooter />
    </div>
  );
}

export async function getServerSideProps() {
  let serverBasicLimitData;
  let serverKeyLimitData;
  serverBasicLimitData = await axios.get(
    "https://min-api.cryptocompare.com/stats/rate/limit"
  );
  serverKeyLimitData = await axios.get(
    `https://min-api.cryptocompare.com/stats/rate/limit?api_key=${process.env.cryptocompare}`
  );
  serverBasicLimitData = serverBasicLimitData.data;
  serverKeyLimitData = serverKeyLimitData.data;

  return {
    props: {
      serverBasicLimitData: serverBasicLimitData,
      serverKeyLimitData: serverKeyLimitData,
    },
  };
}
