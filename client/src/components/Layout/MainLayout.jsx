import React from "react";
import { Routes, Route } from "react-router-dom";
import styles from "./mainLayout.module.scss";
import MainHeader from "./MainHeader/MainHeader";
import ContentLayout from "./ContentLayout/ContentLayout";

const MainLayout = () => {
  return (
    <div className={styles.mainLayoutWrapper}>
      <MainHeader />
      <Routes>
        <Route index element={<ContentLayout />} />
      </Routes>
    </div>
  );
};

export default MainLayout;
