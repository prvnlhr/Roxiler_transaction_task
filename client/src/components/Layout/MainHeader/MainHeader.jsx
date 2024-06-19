import React from "react";
import styles from "./styles/mainHeader.module.scss";

const MainHeader = () => {
  return (
    <nav className={styles.headerWrapper}>
      <div className={styles.headerWrapper__appLogoWrapper}></div>
    </nav>
  );
};

export default MainHeader;
