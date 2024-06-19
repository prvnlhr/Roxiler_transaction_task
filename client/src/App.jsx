import React from "react";
import app_styles from "./app.module.scss";
import MainLayout from "./components/Layout/MainLayout";
import { TransactionsProvider } from "./context/TransactionsContext";

const App = () => {
  return (
    <div className={app_styles.app}>
      <TransactionsProvider>
        <MainLayout />
      </TransactionsProvider>
    </div>
  );
};

export default App;
