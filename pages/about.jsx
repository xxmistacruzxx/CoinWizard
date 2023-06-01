import styles from "../styles/About.module.css";
import Header from "../components/Header/Header.jsx";
import AboutCard from "../components/AboutCard/AboutCard.jsx";

export default function Address() {
  return (
    <div className="pageContainer">
      <Header />
      <div className={styles.aboutSection}>
        <div>
          <img src="/coinwizard.png" />
          <h2>About CoinWizard</h2>
          <p>
            CoinWizard is a Cryptocurrency website designed to give basic, but
            real-time information.
          </p>
          <p>
            The main features of CoinWizard are real-time cryptocurrency market
            monitoring, real-time cryptocurrency exchange rates/conversions, and
            account address lookups.
          </p>
          <p>
            Developed by a single developer in their freetime, CoinWizard is an
            effort by the developer to improve their Full-Stack Web Development
            skills.
          </p>
          <div>
            <h3>Tools, Libraries, and APIs</h3>
            <div>
              <AboutCard
                title1={"Library"}
                title2={"Next.js"}
                backgroundImage={"/nextjs.png"}
                buttonText={"Learn about Next.js"}
                buttonLink={"https://nextjs.org/"}
              />
              <AboutCard
                title1={"Library"}
                title2={"React"}
                backgroundImage={"/react.png"}
                buttonText={"Learn about React"}
                buttonLink={"https://react.dev/"}
              />
              <AboutCard
                title1={"API"}
                title2={"CryptoCompare API"}
                backgroundImage={"/cryptocompare.png"}
                buttonText={"Learn about CCAPI"}
                buttonLink={"https://www.cryptocompare.com/"}
              />
            </div>
          </div>
        </div>
        <div>
          <img src="/Me.jpg" />
          <h2>About The Developer</h2>
          <p>
            I'm David Cruz, a Class of 2024 Computer Science Undergraduate at
            Stevens Institute of Technology in Hoboken, NJ.
          </p>
          <p>
            At Stevens, I garnered a large interest in User Experience and
            Interface Design, Web Development, and Database Design & Management.
          </p>
          <div>
            <h3>Where to Find Me</h3>
            <div>
              <AboutCard
                title1={"Portfolio"}
                title2={"My Website"}
                backgroundImage={"/portfolio.png"}
                buttonText={"GO TO PORTFOLIO"}
                buttonLink={"https://xxmistacruzxx.github.io/"}
              />
              <AboutCard
                title1={"Connect"}
                title2={"My LinkedIn"}
                backgroundImage={"/linkedin.png"}
                buttonText={"GO TO LINKEDIN"}
                buttonLink={"https://www.linkedin.com/in/davidalexandercruz/"}
              />
              <AboutCard
                title1={"Code"}
                title2={"My Github"}
                backgroundImage={"/github.png"}
                buttonText={"GO TO GITHUB"}
                buttonLink={"https://github.com/xxmistacruzxx"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
