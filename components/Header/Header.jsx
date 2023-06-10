import styles from "./Header.module.css";

export default function Header() {
  return (
    <nav id={styles.navbar}>
      <a href="/">
        <img src="/coinwizard.png" />
        <h1>CoinWizard</h1>
      </a>
      <div>
        <a href="/">Coins</a>
        <a href="/converter">Converter</a>
        <a href="/address">Address Lookup</a>
        <a href="/limits">Limits</a>
        <a href="/about">About</a>
      </div>
    </nav>
  );
}
