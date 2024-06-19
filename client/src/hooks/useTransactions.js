import { useState, useEffect } from "react";
import axios from "axios";

const useTransactions = (month, page = 1, perPage = 3) => {
  const [transactions, setTransactions] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9000/api/transactions/transactions`,
          {
            params: {
              month: month,
              page: page,
              perPage: perPage,
            },
          }
        );

        const { transactions, totalPages, pageNo, perPageCnt } = response.data;
        console.log(transactions, totalPages, pageNo, perPageCnt);
        // setTransactions(data.transactions);
        // setTotal(data.total);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    if (month !== "") {
      fetchData();
    }
  }, [month, page, perPage]);

  return { transactions, total };
};

export default useTransactions;
