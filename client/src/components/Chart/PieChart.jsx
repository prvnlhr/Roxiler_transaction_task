import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";

import SubHeader from "../Layout/SubHeader/SubHeader";
import styles from "./styles/pieChart.module.scss";
import { useTransactions } from "../../context/TransactionsContext";

const PieChart = () => {
  const { pieData } = useTransactions();

  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    if (chartInstance.current) {
      chartInstance.current.destroy();
    }
    console.log(pieData);
    if (chartRef && chartRef.current && pieData && pieData.length > 0) {
      const ctx = chartRef.current.getContext("2d");
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: pieData?.map(
            (item) => item.category[0].toUpperCase() + item.category.slice(1)
          ),
          datasets: [
            {
              data: pieData.map((item) => item.count),
              backgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
              ],
              hoverBackgroundColor: [
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
                "#9966FF",
                "#FF9F40",
                "#FF6384",
                "#36A2EB",
                "#FFCE56",
                "#4BC0C0",
              ],
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
            },
          },
        },
      });
    }
  }, [pieData]);

  return (
    <div className={styles.pieChartWrapper}>
      <div className={styles.headerWrapper}>
        <SubHeader title={"Pie Chart"} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.chartCard}>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default PieChart;
