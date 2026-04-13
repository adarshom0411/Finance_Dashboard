const { StatusCodes } = require("http-status-codes");
const FinancialRecord = require("../models/FinancialRecord");
const AppError = require("../utils/AppError");
const asyncHandler = require("../utils/asyncHandler");

const buildRecordFilters = (query) => {
  const filters = {};

  const allowedTypes = ["income", "expense"];
  if (query.type && allowedTypes.includes(query.type)) {
    filters.type = query.type;
  }

  if (query.category) {
    filters.category = { $regex: `^${query.category}$`, $options: "i" };
  }

  if (query.startDate || query.endDate) {
    filters.date = {};

    if (query.startDate) {
      filters.date.$gte = new Date(query.startDate);
    }

    if (query.endDate) {
      filters.date.$lte = new Date(query.endDate);
    }
  }

  if (query.keyword) {
    filters.$or = [
      { category: { $regex: query.keyword, $options: "i" } },
      { notes: { $regex: query.keyword, $options: "i" } }
    ];
  }

  filters.isDeleted = { $ne: true };

  return filters;
};

const createRecord = asyncHandler(async (req, res) => {
  const record = await FinancialRecord.create({
    ...req.body,
    createdBy: req.user.id || req.user._id,
    updatedBy: req.user.id || req.user._id
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

  //user-based data isolation
  filters.createdBy = req.user.id || req.user._id;

  const sortBy = req.query.sort || "-date";

  const [records, total] = await Promise.all([
    FinancialRecord.find(filters)
      .sort(sortBy)
      .skip(skip)
      .limit(limit)
      .populate("createdBy", "name email role")
      .populate("updatedBy", "name email role"),
    FinancialRecord.countDocuments(filters)
  ]);

  res.status(StatusCodes.OK).json({
    success: true,
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

  if (!record || record.isDeleted) {
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

  if (!record || record.isDeleted) {
    throw new AppError("Financial record not found.", StatusCodes.NOT_FOUND);
  }

  Object.assign(record, req.body, { updatedBy: req.user.id });
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

  if (!record || record.isDeleted) {
    throw new AppError("Financial record not found.", StatusCodes.NOT_FOUND);
  }

  record.isDeleted = true;
  await record.save();

  res.status(StatusCodes.OK).json({
    message: "Financial record soft deleted successfully."
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