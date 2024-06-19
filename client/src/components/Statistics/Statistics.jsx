import React from "react";
import styles from "./styles/stats.module.scss";
import SubHeader from "../Layout/SubHeader/SubHeader";
import { useTransactions } from "../../context/TransactionsContext";

const Statistics = () => {
  const { month, statistics } = useTransactions();
  return (
    <div className={styles.statsWrapper}>
      <div className={styles.headerWrapper}>
        <SubHeader title={"Statistics"} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.statsCard}>
          <div className={styles.statsElement}>
            <div className={styles.valueDiv}>
              <p> {Math.round(statistics?.totalSales)}</p>
            </div>
            <div className={styles.labelDiv}>
              <p>TOTAL SALES</p>
            </div>
          </div>
          <div className={styles.statsElement}>
            <div className={styles.valueDiv}>
              <p>{statistics?.sold}</p>
            </div>
            <div className={styles.labelDiv}>
              <p>TOTAL SOLD ITEMS</p>
            </div>
          </div>
          <div className={styles.statsElement}>
            <div className={styles.valueDiv}>
              <p>{statistics?.unsold}</p>
            </div>
            <div className={styles.labelDiv}>
              <p>TOTAL UNSOLD ITEMS</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
