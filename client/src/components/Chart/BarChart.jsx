import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import styles from "./styles/barChart.module.scss";
import SubHeader from "../Layout/SubHeader/SubHeader";
import { useTransactions } from "../../context/TransactionsContext";

const BarChart = () => {
  const { priceRanges } = useTransactions();
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy(); // Destroy the existing chart instance
    }

    if (chartRef && chartRef.current && priceRanges) {
      const ctx = chartRef.current.getContext("2d");

      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: [
            "0-100",
            "101-200",
            "201-300",
            "301-400",
            "401-500",
            "501-600",
            "601-700",
            "701-800",
            "801-900",
            "901-above",
          ],
          datasets: [
            {
              label: "Number of Items",
              data: [
                priceRanges.range0_100,
                priceRanges.range101_200,
                priceRanges.range201_300,
                priceRanges.range301_400,
                priceRanges.range401_500,
                priceRanges.range501_600,
                priceRanges.range601_700,
                priceRanges.range701_800,
                priceRanges.range801_900,
                priceRanges.range901_above,
              ],
              backgroundColor: "#635DB0",
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                  return tooltipItem.yLabel;
                },
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                stepSize: 1,
              },
              grid: {
                display: true,
              },
            },
            x: {
              grid: {
                display: false,
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }

    return () => {
      if (chartInstance) {
        chartInstance.destroy();
      }
    };
  }, [priceRanges]);

  return (
    <div className={styles.barChartWrapper}>
      <div className={styles.headerWrapper}>
        <SubHeader title={"Bar Chart"} />
      </div>
      <div className={styles.contentWrapper}>
        <div className={styles.chartCard}>
          <canvas ref={chartRef} />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
