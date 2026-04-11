const FinancialRecord = require("../models/FinancialRecord");

// ✅ EXISTING (UNCHANGED)
exports.createRecord = async (req, res, next) => {
  try {
    const record = await FinancialRecord.create({
      ...req.body,
      updatedBy: req.user.id 
    });

    res.status(201).json({
      success: true,
      data: record
    });
  } catch (err) {
    next(err);
  }
};


// =======================================================
// ✅ MODIFIED: getRecords (pagination + search + filter)
// =======================================================

exports.getRecords = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, keyword, type, category } = req.query;

    let filter = {};

    // ✅ Search
    if (keyword) {
      filter.$or = [
        { category: { $regex: keyword, $options: "i" } },
        { notes: { $regex: keyword, $options: "i" } }
      ];
    }

    // ✅ Filters
    if (type) filter.type = type;
    if (category) filter.category = category;

    // ✅ Soft delete filter
    filter.isDeleted = { $ne: true };

    const skip = (page - 1) * limit;

    const records = await FinancialRecord.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    res.json({
      success: true,
      data: records
    });
  } catch (err) {
    next(err);
  }
};


// =======================================================
// ✅ ADDED: Get Record By ID (THIS WAS MISSING)
// =======================================================

exports.getRecordById = async (req, res, next) => {
  try {
    const record = await FinancialRecord.findOne({
      _id: req.params.id,
      isDeleted: { $ne: true }
    });

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    res.json({
      success: true,
      data: record
    });
  } catch (err) {
    next(err);
  }
};


// =======================================================
// ✅ EXISTING (UNCHANGED)
// =======================================================

exports.updateRecord = async (req, res, next) => {
  try {
    const record = await FinancialRecord.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user.id 
      },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    res.json({
      success: true,
      data: record
    });
  } catch (err) {
    next(err);
  }
};


// =======================================================
// ✅ MODIFIED: Soft Delete
// =======================================================

exports.deleteRecord = async (req, res, next) => {
  try {
    const record = await FinancialRecord.findByIdAndUpdate(
      req.params.id,
      { isDeleted: true },
      { new: true }
    );

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    res.json({
      success: true,
      message: "Record soft deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};