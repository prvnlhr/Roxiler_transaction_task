const { Transaction } = require("../models/transactions");
const axios = require("axios");
const getMonthDateRange = (month) => {
  month = month.padStart(2, "0");
  const startDate = new Date(`2000-${month}-01`);
  const endDate = new Date(startDate);
  endDate.setMonth(startDate.getMonth() + 1);
  endDate.setDate(0);
  return { startDate, endDate };
};

const transactionsController = {
  fetchAndSeedData: async (req, res) => {
    const response = await axios.get(
      "https://s3.amazonaws.com/roxiler.com/product_transaction.json"
    );
    const data = response.data;
    await Transaction.deleteMany({});
    await Transaction.insertMany(data);
    res.status(200).json({ message: "Data seeded successfully" });
  },

  getTransactions: async (req, res) => {
    const { month, page = 1, perPage = 10, search } = req.query;

    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
      },
    };

    if (search) {
      query.$or = [
        { title: { $regex: new RegExp(search, "i") } },
        { description: { $regex: new RegExp(search, "i") } },
        { price: { $regex: new RegExp(search, "i") } },
      ];
    }
    try {
      const totalDocuments = await Transaction.countDocuments(query);
      const totalPages = Math.ceil(totalDocuments / perPage);

      const transactions = await Transaction.find(query)
        .skip((page - 1) * perPage)
        .limit(Number(perPage));

      res.status(200).json({
        transactions,
        totalPages,
        pageNo: parseInt(page, 10),
        perPageCnt: parseInt(perPage, 10),
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getStatistics: async (req, res) => {
    const { month } = req.query;

    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, parseInt(month)],
      },
    };

    try {
      const totalSaleAmount = await Transaction.aggregate([
        {
          $match: {
            ...query,
            sold: true,
          },
        },
        {
          $group: {
            _id: null,
            totalAmount: { $sum: { $toDouble: "$price" } },
          },
        },
      ]);

      const totalSoldItems = await Transaction.countDocuments({
        ...query,
        sold: true,
      });

      const totalNotSoldItems = await Transaction.countDocuments({
        ...query,
        sold: false,
      });

      // console.log(totalSaleAmount, totalSoldItems, totalNotSoldItems);

      res.status(200).json({
        totalSaleAmount:
          totalSaleAmount.length > 0 ? totalSaleAmount[0].totalAmount : 0,
        totalSoldItems,
        totalNotSoldItems,
      });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  getBarChart: async (req, res) => {
    const { month } = req.query;

    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, { $toInt: month }],
      },
    };

    try {
      const priceRanges = await Transaction.aggregate([
        {
          $match: query,
        },
        {
          $addFields: {
            priceNumeric: { $toDouble: "$price" },
          },
        },
        {
          $group: {
            _id: null,
            range0_100: {
              $sum: { $cond: [{ $lte: ["$priceNumeric", 100] }, 1, 0] },
            },
            range101_200: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gt: ["$priceNumeric", 100] },
                      { $lte: ["$priceNumeric", 200] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            range201_300: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gt: ["$priceNumeric", 200] },
                      { $lte: ["$priceNumeric", 300] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            range301_400: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gt: ["$priceNumeric", 300] },
                      { $lte: ["$priceNumeric", 400] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            range401_500: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gt: ["$priceNumeric", 400] },
                      { $lte: ["$priceNumeric", 500] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            range501_600: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gt: ["$priceNumeric", 500] },
                      { $lte: ["$priceNumeric", 600] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            range601_700: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gt: ["$priceNumeric", 600] },
                      { $lte: ["$priceNumeric", 700] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            range701_800: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gt: ["$priceNumeric", 700] },
                      { $lte: ["$priceNumeric", 800] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            range801_900: {
              $sum: {
                $cond: [
                  {
                    $and: [
                      { $gt: ["$priceNumeric", 800] },
                      { $lte: ["$priceNumeric", 900] },
                    ],
                  },
                  1,
                  0,
                ],
              },
            },
            range901_above: {
              $sum: { $cond: [{ $gt: ["$priceNumeric", 900] }, 1, 0] },
            },
          },
        },
      ]);

      const result = priceRanges.length > 0 ? priceRanges[0] : {};

      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  getPieChart: async (req, res) => {
    const { month } = req.query;
    const query = {
      $expr: {
        $eq: [{ $month: "$dateOfSale" }, { $toInt: month }],
      },
    };

    try {
      const response = await Transaction.aggregate([
        {
          $match: query,
        },
        {
          $group: {
            _id: "$category",
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            _id: 0,
            category: "$_id",
            count: 1,
          },
        },
      ]);
      res.status(200).json(response);
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = transactionsController;
