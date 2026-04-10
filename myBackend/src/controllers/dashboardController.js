const FinancialRecord = require("../models/FinancialRecord");

exports.getSummary = async (req, res, next) => {
  try {
    const records = await FinancialRecord.find();

    const totalIncome = records
      .filter((r) => r.type === "income")
      .reduce((sum, r) => sum + r.amount, 0);

    const totalExpense = records
      .filter((r) => r.type === "expense")
      .reduce((sum, r) => sum + r.amount, 0);

    const netBalance = totalIncome - totalExpense;

    res.json({
      success: true,
      data: {
        totalIncome,
        totalExpense,
        netBalance
      }
    });
  } catch (err) {
    next(err);
  }
};

exports.getCategories = async (req, res, next) => {
  try {
    const data = await FinancialRecord.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" }
        }
      }
    ]);

    res.json({
      success: true,
      data
    });
  } catch (err) {
    next(err);
  }
};

exports.getRecent = async (req, res, next) => {
  try {
    const records = await FinancialRecord.find()
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      success: true,
      data: records
    });
  } catch (err) {
    next(err);
  }
};