import styles from "./PoweredByFooter.module.css";

export default function Header() {
  return (
    <footer className={styles.PoweredByFooter}>
      <a
        href="https://www.cryptocompare.com/"
        title="CryptoCompare"
        target="_blank"
        rel="noreferrer noopener"
      >
        <img src="https://www.cryptocompare.com/media/20562/favicon.png" />
        <p>Powered by CryptoCompare API</p>
      </a>
    </footer>
  );
}
