import React from "react";
import styles from "./styles.module.scss";

const Food = () => {
  return (
    <section className={styles.foodSection}>
      <div className={styles.headerText}>
        <span>MATEN</span>
        <h2>
          Vår passion för växtbaserad <br />
          matlagning
        </h2>
      </div>
      <div className={[styles.foodContainer, "ea-grid"].join(" ")}>
        <div
          className={[styles.foodTextWrapper, "ea-col-6 ea-col-xs-12"].join(
            " "
          )}
        >
          <p>
            På Hermitage, tror vi på att ge näring till både kropp och själ. Vår
            meny är omsorgsfullt gjord med färska, säsongsbetonade råvaror från
            lokala gårdar. Oavsett om du är en livslång vegetarian eller bara
            utforskar en växtbaserad kost, erbjuder vi något för alla smaker.
          </p>
        </div>

        <div
          className={[styles.foodImageWrapper, "ea-col-6 ea-col-xs-12"].join(
            " "
          )}
        >
          <img src="/home/vegmeal.png" alt="" />
        </div>
      </div>

      <div className={styles.greenImage}></div>
    </section>
  );
};

export default Food;
