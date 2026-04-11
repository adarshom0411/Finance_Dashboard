const FinancialRecord = require("../models/FinancialRecord");

// ✅ EXISTING (UNCHANGED)
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

// ✅ EXISTING (UNCHANGED)
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

// ✅ EXISTING (UNCHANGED)
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



// =======================================================
// ✅ ADDED: Monthly Trends (REQUIRED BY ASSIGNMENT)
// =======================================================

exports.getMonthlyTrends = async (req, res, next) => {
  try {
    const data = await FinancialRecord.aggregate([
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" }
          },
          totalIncome: {
            $sum: {
              $cond: [{ $eq: ["$type", "income"] }, "$amount", 0]
            }
          },
          totalExpense: {
            $sum: {
              $cond: [{ $eq: ["$type", "expense"] }, "$amount", 0]
            }
          }
        }
      },
      {
        $sort: {
          "_id.year": 1,
          "_id.month": 1
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