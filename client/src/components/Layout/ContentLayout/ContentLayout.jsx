import React from "react";
import styles from "./styles/contentLayout.module.scss";
import DataTable from "../../DataTable/DataTable";
import Statistics from "../../Statistics/Statistics";


const ContentLayout = () => {
  return (
    <div className={styles.contentLayoutWrapper}>
      <div className={styles.contentLayoutWrapper__contentAreaWrapper}>
        <DataTable />
        <Statistics />
      
      </div>
    </div>
  );
};

export default ContentLayout;
