const FinancialRecord = require("../models/FinancialRecord");

exports.createRecord = async (data) => {
  return await FinancialRecord.create(data);
};

exports.getRecords = async () => {
  return await FinancialRecord.find().sort({ createdAt: -1 });
};