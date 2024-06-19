const express = require("express");
const router = express.Router();

const transactionsController = require("../controller/transactionsController");

router.get("/seed", transactionsController.fetchAndSeedData);
router.get("/transactions", transactionsController.getTransactions);
router.get("/statistics", transactionsController.getStatistics);
router.get("/bar-chart", transactionsController.getBarChart);
router.get("/pie-chart", transactionsController.getPieChart);

module.exports = router;
