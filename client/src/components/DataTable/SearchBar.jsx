import React from "react";
import styles from "./styles/searchBar.module.scss";
import SearchIcon from "../Common/Icon/SearchIcon/SearchIcon";
import { useTransactions } from "../../context/TransactionsContext";

const SearchBar = () => {
  const { setSearchInput } = useTransactions();

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  return (
    <div className={styles.searchBarWrapper}>
      <div className={styles.searchBarWrapper__inputWrapper}>
        <input
          onChange={handleSearchInputChange}
          placeholder="Title, Description, Price"
        />
      </div>
      <div className={styles.searchBarWrapper__iconWrapper}>
        <div>
          <SearchIcon />
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
