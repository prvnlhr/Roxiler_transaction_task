const express = require("express");
const router = express.Router();

router.use("/api/transactions", require("./transactionsRoute"));

module.exports = router;
