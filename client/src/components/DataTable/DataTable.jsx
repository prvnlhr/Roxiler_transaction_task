import React from "react";
import styles from "./styles/datatable.module.scss";
import SubHeader from "../Layout/SubHeader/SubHeader";
import DropDown from "./DropDown";
import SearchBar from "./SearchBar";

import { useTransactions } from "../../context/TransactionsContext";

const DataTable = () => {
  const { transactions, total, page, perPage, setPage } = useTransactions();
  const excludeColumns = ["image", "description", "id", "_id", "__v"];

  const columns = Object.keys(transactions[0] || []).filter(
    (col) => !excludeColumns.includes(col)
  );

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  const capitalizeCategory = (category) => {
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  const calculateSerialNumber = (index) => {
    return (page - 1) * perPage + index + 1;
  };

  const PaginationControls = () => {
    return (
      <div className={styles.tablePaginationWrapper}>
        <button
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
          className={`${styles.prevNextBtn}  ${
            page === 1 && styles["prevNextBtn--disabled"]
          }`}
        >
          <p>Prev</p>
        </button>

        {Array.from({ length: total }, (_, index) => (
          <button
            className={`${styles.pagNoBtn} ${
              page === index + 1 && styles["pagNoBtn--active"]
            }`}
          >
            <p>{index + 1}</p>
          </button>
        ))}

        <button
          disabled={page === total}
          onClick={() => setPage((prev) => prev + 1)}
          className={`${styles.prevNextBtn} ${
            page === total && styles["prevNextBtn--disabled"]
          } `}
        >
          <p>Next</p>
        </button>
      </div>
    );
  };

  return (
    <div className={styles.datatable}>
      <div className={styles.datatable__headerWrapper}>
        <div className={styles.datatable__headerWrapper__left}>
          <SubHeader title={"Transactions"} />
        </div>
        <div className={styles.datatable__headerWrapper__right}>
          <DropDown />
        </div>
      </div>

      <div className={styles.datatable__contentOuterWrapper}>
        <div className={styles.searchWrapper}>
          <SearchBar />
        </div>

        <div className={styles.tableWrapper}>
          <div className={styles.tableScrollWrapper}>
            <table>
              <thead>
                <th>
                  <p className={styles.text}>Sr.No</p>
                </th>

                {columns.map((colName) => (
                  <th>
                    <p className={styles.text}>
                      {colName.charAt(0).toUpperCase() + colName.slice(1)}
                    </p>
                  </th>
                ))}
              </thead>
              <tbody>
                {transactions.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td>
                      <p>{calculateSerialNumber(rowIndex)}</p>
                    </td>
                    {columns.map((colName) => (
                      <td key={colName}>
                        <p>
                          {colName === "dateOfSale"
                            ? formatDate(row[colName])
                            : colName === "category"
                            ? capitalizeCategory(row[colName])
                            : row[colName] === false
                            ? "Not Sold"
                            : row[colName] === true
                            ? "Sold"
                            : row[colName]}
                        </p>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <PaginationControls />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
