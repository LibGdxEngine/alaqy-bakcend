const mongoose = require("mongoose");

const REQUEST_STATUS = {
  PENDING: 0,
  ACCEPTED: 1,
  REJECTED: 2,
  COMPLETED: 3,
};

const requestSchema = mongoose.Schema(
  {
    owner: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    requestPhoto: {
      type: String,
    },
    requestCategory: {
      type: String,
    },
    requestDesc: {
      type: String,
    },
    status: {
      type: Number,
      default: REQUEST_STATUS.PENDING,
    },
    offers: [{ type: mongoose.ObjectId, ref: "Offer", required: false }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
