const FinancialRecord = require("../models/FinancialRecord");
const mongoose = require("mongoose"); // ✅ ADDED

exports.getSummary = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id; // ✅ FIXED

    const records = await FinancialRecord.find({
      createdBy: userId,
      isDeleted: { $ne: true }
    });

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
    const userId = req.user.id || req.user._id; // ✅ FIXED

    const data = await FinancialRecord.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(userId), // ✅ FIXED
          isDeleted: { $ne: true }
        }
      },
      {
        $group: {
          _id: "$category",
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
    const userId = req.user.id || req.user._id; // ✅ FIXED

    const records = await FinancialRecord.find({
      createdBy: userId,
      isDeleted: { $ne: true }
    })
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

exports.getMonthlyTrends = async (req, res, next) => {
  try {
    const userId = req.user.id || req.user._id; // ✅ FIXED

    const data = await FinancialRecord.aggregate([
      {
        $match: {
          createdBy: new mongoose.Types.ObjectId(userId), // ✅ FIXED
          isDeleted: { $ne: true }
        }
      },
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