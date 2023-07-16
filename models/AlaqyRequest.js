const mongoose = require("mongoose");

const REQUEST_STATUS = {
  PENDING: 0,
  ACCEPTED: 1,
  REJECTED: 2,
};

const requestSchema = mongoose.Schema(
  {
    sender: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    receivedOffers: [
      { type: mongoose.ObjectId, ref: "Offers", required: false },
    ],
    status: {
      type: Number,
      default: REQUEST_STATUS.PENDING,
    },
    token: {
      type: String,
    },
    privateRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrivateRoom",
    },
    requestPhoto: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Request", requestSchema);
