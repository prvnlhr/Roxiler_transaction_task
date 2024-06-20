import React from "react";
import styles from "./styles/contentLayout.module.scss";
import DataTable from "../../DataTable/DataTable";
import Statistics from "../../Statistics/Statistics";
import BarChart from "../../Chart/BarChart";
import PieChart from "../../Chart/PieChart";

const ContentLayout = () => {
  return (
    <div className={styles.contentLayoutWrapper}>
      <div className={styles.contentLayoutWrapper__contentAreaWrapper}>
        <DataTable />
        <Statistics />
        {/* <BarChart /> */}
        {/* <PieChart /> */}
      </div>
    </div>
  );
};

export default ContentLayout;
