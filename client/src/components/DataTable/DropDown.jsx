import React, { useState } from "react";
import styles from "./styles/dropDown.module.scss";
import { useTransactions } from "../../context/TransactionsContext";

const DropDown = () => {
  const { transactions, total, page, setPage, month, setMonth } =
    useTransactions();

  const handleMonthChange = (e) => {
    console.log(e.target.value);
    setMonth(e.target.value);
  };
  const months = [
    { month: "January", value: "01" },
    { month: "February", value: "02" },
    { month: "March", value: "03" },
    { month: "April", value: "04" },
    { month: "May", value: "05" },
    { month: "June", value: "06" },
    { month: "July", value: "07" },
    { month: "August", value: "08" },
    { month: "September", value: "09" },
    { month: "October", value: "10" },
    { month: "November", value: "11" },
    { month: "December", value: "12" },
  ];
  return (
    <div className={styles.dropDownWrapper}>
      <select onChange={handleMonthChange}>
        {months.map((month) => (
          <option value={month.value} selected={month.value === "03"}>
            {month.month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDown;
