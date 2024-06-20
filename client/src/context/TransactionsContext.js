import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TransactionsContext = createContext();

export const useTransactions = () => useContext(TransactionsContext);

const apiBaseUrl = process.env.REACT_APP_API_BASE_URL;

export const TransactionsProvider = ({ children }) => {
  const [month, setMonth] = useState("03");
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchInput, setSearchInput] = useState("");
  const [pieData, setPieData] = useState([]);

  const [priceRanges, setPriceRanges] = useState({
    range0_100: 0,
    range101_200: 0,
    range201_300: 0,
    range301_400: 0,
    range401_500: 0,
    range501_600: 0,
    range601_700: 0,
    range701_800: 0,
    range801_900: 0,
    range901_above: 0,
  });
  const [statistics, setStatistics] = useState({
    totalSales: 0,
    sold: 0,
    unsold: 0,
  });

  useEffect(() => {
    if (month !== "") {
      fetchTransactionsForMonth();
      fetchStatisticsForMonth();
      fetchChartDataForMonth();
      fetchPieDataForMonth();
    }
  }, [month, page, perPage]);

  const applyFilter = (transactions, searchInput) => {
    return transactions.filter(
      (transaction) =>
        transaction.title.toLowerCase().includes(searchInput.toLowerCase()) ||
        transaction.description
          .toLowerCase()
          .includes(searchInput.toLowerCase()) ||
        transaction.price.toString().includes(searchInput)
    );
  };

  const fetchTransactionsForMonth = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/transactions/transactions`,
        {
          params: {
            month: month,
            page: page,
            perPage: perPage,
            search: searchInput,
          },
        }
      );

      const { transactions, totalPages, pageNo, perPageCnt } = response.data;

      if (
        Array.isArray(transactions) &&
        typeof totalPages === "number" &&
        typeof pageNo === "number" &&
        typeof perPageCnt === "number"
      ) {
        setTotal(totalPages);
        setPage(pageNo);
        setPerPage(perPageCnt);

        const filteredTransactions = applyFilter(transactions, searchInput);
        setTransactions(filteredTransactions);
      } else {
        console.error("Unexpected response format:", response.data);
        setTransactions([]);
        setTotal(0);
        setPage(1);
        setPerPage(2);
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setTransactions([]);
      setTotal(0);
      setPage(1);
      setPerPage(2);
    }
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      fetchTransactionsForMonth();
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchInput]);

  const fetchStatisticsForMonth = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/transactions/statistics`,
        {
          params: {
            month: month,
          },
        }
      );

      const { totalSaleAmount, totalSoldItems, totalNotSoldItems } =
        response.data;

      if (
        typeof totalSaleAmount === "number" &&
        typeof totalSoldItems === "number" &&
        typeof totalNotSoldItems === "number"
      ) {
        setStatistics({
          totalSales: totalSaleAmount,
          sold: totalSoldItems,
          unsold: totalNotSoldItems,
        });
      } else {
        console.error("Unexpected response format:", response.data);
        setStatistics({
          totalSales: 0,
          sold: 0,
          unsold: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching statistics:", error);
      setStatistics({
        totalSales: 0,
        sold: 0,
        unsold: 0,
      });
    }
  };

  const fetchChartDataForMonth = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/transactions/bar-chart`,
        {
          params: {
            month: month,
          },
        }
      );

      if (typeof response.data === "object" && response.data !== null) {
        setPriceRanges(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setPriceRanges({
          range0_100: 0,
          range101_200: 0,
          range201_300: 0,
          range301_400: 0,
          range401_500: 0,
          range501_600: 0,
          range601_700: 0,
          range701_800: 0,
          range801_900: 0,
          range901_above: 0,
        });
      }
    } catch (error) {
      console.error("Error fetching Chart Data:", error);
      setPriceRanges({
        range0_100: 0,
        range101_200: 0,
        range201_300: 0,
        range301_400: 0,
        range401_500: 0,
        range501_600: 0,
        range601_700: 0,
        range701_800: 0,
        range801_900: 0,
        range901_above: 0,
      });
    }
  };

  const fetchPieDataForMonth = async () => {
    try {
      const response = await axios.get(
        `${apiBaseUrl}/api/transactions/pie-chart`,
        {
          params: {
            month: month,
          },
        }
      );

      if (
        Array.isArray(response.data) &&
        response.data.length > 0 &&
        response.data[0].category &&
        response.data[0].count !== undefined
      ) {
        setPieData(response.data);
      } else {
        console.error("Unexpected response format:", response.data);
        setPieData([]);
      }
    } catch (error) {
      console.error("Error fetching Pie Chart Data:", error);
      setPieData([]);
    }
  };

  return (
    <TransactionsContext.Provider
      value={{
        month,
        setMonth,
        transactions,
        total,
        page,
        setPage,
        perPage,
        setPerPage,
        statistics,
        setSearchInput,
        priceRanges,
        pieData,
      }}
    >
      {children}
    </TransactionsContext.Provider>
  );
};
