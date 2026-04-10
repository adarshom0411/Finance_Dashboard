const { StatusCodes } = require("http-status-codes");

const FinancialRecord = require("../models/FinancialRecord");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const buildRecordFilters = (query) => {
  const filters = {};

  if (query.type) {
    filters.type = query.type;
  }

  if (query.category) {
    filters.category = query.category;
  }

  if (query.startDate || query.endDate) {
    filters.date = {};
  }

  if (query.startDate) {
    filters.date.$gte = new Date(query.startDate);
  }

  if (query.endDate) {
    filters.date.$lte = new Date(query.endDate);
  }

  return filters;
};

const createRecord = asyncHandler(async (req, res) => {
  const record = await FinancialRecord.create({
    ...req.body,
    createdBy: req.user._id,
    updatedBy: req.user._id
  });

  res.status(StatusCodes.CREATED).json({
    message: "Financial record created successfully.",
    data: {
      record
    }
  });
});

const listRecords = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const filters = buildRecordFilters(req.query);

  const [records, total] = await Promise.all([
    FinancialRecord.find(filters)
      .sort({ date: -1, createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email role")
      .populate("updatedBy", "name email role"),
    FinancialRecord.countDocuments(filters)
  ]);

  res.status(StatusCodes.OK).json({
    data: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit) || 1,
      records
    }
  });
});

const getRecordById = asyncHandler(async (req, res) => {
  const record = await FinancialRecord.findById(req.params.id)
    .populate("createdBy", "name email role")
    .populate("updatedBy", "name email role");

  if (!record) {
    throw new AppError("Financial record not found.", StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({
    data: {
      record
    }
  });
});

const updateRecord = asyncHandler(async (req, res) => {
  const record = await FinancialRecord.findById(req.params.id);

  if (!record) {
    throw new AppError("Financial record not found.", StatusCodes.NOT_FOUND);
  }

  Object.assign(record, req.body, { updatedBy: req.user._id });
  await record.save();

  res.status(StatusCodes.OK).json({
    message: "Financial record updated successfully.",
    data: {
      record
    }
  });
});

const deleteRecord = asyncHandler(async (req, res) => {
  const record = await FinancialRecord.findById(req.params.id);

  if (!record) {
    throw new AppError("Financial record not found.", StatusCodes.NOT_FOUND);
  }

  await record.deleteOne();

  res.status(StatusCodes.OK).json({
    message: "Financial record deleted successfully."
  });
});

module.exports = {
  buildRecordFilters,
  createRecord,
  listRecords,
  getRecordById,
  updateRecord,
  deleteRecord
};
