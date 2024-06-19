import React from "react";
import styles from "./styles/subHeader.module.scss";
import CommonHeading from "../../Common/Heading/CommonHeading";
const SubHeader = ({title}) => {
  return (
    <div className={styles.secHeaderWrapper}>
      <CommonHeading title={title} />
    </div>
  );
};

export default SubHeader;
