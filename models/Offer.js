const mongoose = require("mongoose");

const OfferSchema = mongoose.Schema(
  {
    sender: {
      type: String,
      trim: true,
      required: true,
      max: 32,
    },
    receiver: {
      type: String,
      trim: true,

      max: 32,
    },
    description: {
      type: String,
    },

    price: {
      type: String,
    },
    privateRoom: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "PrivateRoom",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", OfferSchema);
