const financeService = require("../services/financeService");

exports.createRecord = async (req, res, next) => {
  try {
    const record = await financeService.createRecord({
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

exports.getRecords = async (req, res, next) => {
  try {
    const records = await financeService.getRecords();

    res.json({
      success: true,
      data: records
    });
  } catch (err) {
    next(err);
  }
};const FinancialRecord = require("../models/FinancialRecord");

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

exports.getRecords = async (req, res, next) => {
  try {
    const records = await FinancialRecord.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: records
    });
  } catch (err) {
    next(err);
  }
};

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

exports.deleteRecord = async (req, res, next) => {
  try {
    const record = await FinancialRecord.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({
        success: false,
        message: "Record not found"
      });
    }

    res.json({
      success: true,
      message: "Record deleted successfully"
    });
  } catch (err) {
    next(err);
  }
};