const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: true
    },
    category: {
      type: String,
      required: true
    },
    date: {
      type: Date,
      required: true
    },
    note: String,

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // ✅ ADDED (required by your controllers)
    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    // ✅ ADDED (used in filters everywhere)
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

// ❌ ORIGINAL (kept but replaced safely)
// module.exports = mongoose.model("FinancialRecord", recordSchema);

// ✅ FIX (prevents model overwrite issue)
module.exports =
  mongoose.models.FinancialRecord ||
  mongoose.model("FinancialRecord", recordSchema);